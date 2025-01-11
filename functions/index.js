require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const axios = require('axios');
const { SUPPORTED_CURRENCIES } = require('./utils/supportedCurrencies');
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

app.get('/get-currency', async (req, res) => {
  // log('Received request for /get-currency');
  try {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const ip = xForwardedFor
      ? xForwardedFor.split(',')[0].trim()
      : req.message.socket.remoteAddress;

    // log(`Extracted ip is ${ip}`);

    const ipinfoToken = process.env.IPINFO_TOKEN;

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

app.get('/list-products', async (req, res) => {
  try {
    const products = await stripe.products.list({ limit: 100 });
    res.json({ products });
  } catch (error) {
    console.error(
      'Error retrieving list of products from Stripe:',
      error.message
    );
    res.status(500).json({ error: 'Unable to list products' });
  }
});

app.get('/list-prices', async (req, res) => {
  try {
    if (!req.query.currency) {
      return res.status(400).json({ error: 'Currency is required' });
    }

    const prices = await stripe.prices.list({
      currency: req.query.currency,
      limit: 100,
    });
    res.json({ prices });
  } catch (error) {
    console.error(
      'Error retrieving list of prices from Stripe:',
      error.message
    );
    res.status(500).json({ error: 'Unable to list prices' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, currency } = req.body;

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).send({ error: 'No items in the shopping bag.' });
    }

    if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
      return res.status(400).send({ error: 'Unsupported currency.' });
    }

    const line_items = lineItems;

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
