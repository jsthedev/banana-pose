const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);
const axios = require('axios');
const priceMapping = require('./priceMapping');
const { mapCountryToCurrency } = require('./utils/currencyMapper');
const { mapCurrencyToCountries } = require('./utils/addressMapper');
const {
  log,
  info,
  debug,
  warn,
  error,
  write,
} = require('firebase-functions/logger');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:5173'; // Adjust as needed

const SUPPORTED_CURRENCIES = [
  'CAD',
  'USD',
  'CNY',
  'JPY',
  'EUR',
  'GBP',
  'KRW',
  'AUD',
  'NZD',
];

app.get('/get-currency', async (req, res) => {
  // log('Received request for /get-currency');
  try {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const ip = xForwardedFor
      ? xForwardedFor.split(',')[0].trim()
      : req.connection.remoteAddress;

    // log(`Extracted ip is ${ip}`);

    const ipinfoToken = functions.config().ipinfo.token;

    if (!ipinfoToken) {
      error('ipinfoToken is not defined');
    }
    // log(`IPinfo Token: ${ipinfoToken}`);

    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${ipinfoToken}`
    );
    const countryCode = response.data.country;
    const currency = mapCountryToCurrency(countryCode);

    // log(`Mapped country code ${countryCode} to currency ${currency}`);

    res.json({ currency });
  } catch (error) {
    console.error('Error fetching geolocation:', error.message);
    res.status(500).json({ error: 'Unable to determine currency' });
  }
});

app.get('/get-price', async (req, res) => {
  const { productId, size, currency } = req.query;
  log(currency);

  if (!productId || !size || !currency) {
    return res
      .status(400)
      .json({ error: 'Missing productId, size, or currency' });
  }

  if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
    return res.status(400).json({ error: 'Unsupported currency' });
  }

  const key = `${productId}-${size}-${currency.toUpperCase()}`;
  const priceId = priceMapping[key];

  if (!priceId) {
    return res
      .status(400)
      .json({ error: 'Price not available for the selected options' });
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    res.json({ price });
  } catch (error) {
    console.error('Error retrieving price from Stripe:', error.message);
    res.status(500).json({ error: 'Unable to retrieve price' });
  }
});

app.post('/get-prices', async (req, res) => {
  const priceRequests = req.body.prices;

  if (!Array.isArray(priceRequests) || priceRequests.length === 0) {
    return res
      .status(400)
      .json({ error: 'Prices array is required and cannot be empty.' });
  }

  // Function to process each individual price request
  const processPriceRequest = async (item, index) => {
    const { productId, size, currency } = item;

    // Validate required fields
    if (!productId || !size || !currency) {
      return {
        index,
        success: false,
        error: 'Missing productId, size, or currency.',
      };
    }

    // Validate currency
    if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
      return {
        index,
        success: false,
        error: `Unsupported currency: ${currency}.`,
      };
    }

    const key = `${productId}-${size}-${currency.toUpperCase()}`;
    const priceId = priceMapping[key];

    if (!priceId) {
      return {
        index,
        success: false,
        error: 'Price not available for the selected options.',
      };
    }

    try {
      const price = await stripe.prices.retrieve(priceId);
      return {
        index,
        success: true,
        price,
      };
    } catch (error) {
      console.error(
        `Error retrieving price for index ${index}:`,
        error.message
      );
      return {
        index,
        success: false,
        error: 'Unable to retrieve price from Stripe.',
      };
    }
  };

  try {
    // Process all price requests concurrently
    const results = await Promise.all(
      priceRequests.map((item, index) => processPriceRequest(item, index))
    );

    res.json({ results });
  } catch (err) {
    console.error('Batch processing error:', err.message);
    res
      .status(500)
      .json({ error: 'An unexpected error occurred during batch processing.' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { shoppingBagItems, currency } = req.body;

    if (
      !shoppingBagItems ||
      !Array.isArray(shoppingBagItems) ||
      shoppingBagItems.length === 0
    ) {
      return res.status(400).send({ error: 'No items in the shopping bag.' });
    }

    if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
      return res.status(400).send({ error: 'Unsupported currency.' });
    }

    const line_items = shoppingBagItems.map((item) => {
      const priceId =
        priceMapping[`${item.id}-${item.size}-${currency.toUpperCase()}`];
      if (!priceId) {
        throw new Error(
          `No Stripe price ID found for item ID: ${item.id}, Size: ${item.size}, Currency: ${currency}`
        );
      }

      return {
        price: priceId,
        quantity: item.quantity,
      };
    });

    const countries = mapCurrencyToCountries(currency);

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: line_items,
      shipping_address_collection: {
        allowed_countries: countries,
      },
      phone_number_collection: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
      },
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

exports.api = functions.https.onRequest(app);
