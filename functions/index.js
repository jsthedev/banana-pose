const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

const stripeSecret = defineSecret('STRIPE_SECRET');
const ipinfoToken = defineSecret('IPINFO_TOKEN');

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

const YOUR_DOMAIN = 'http://localhost:5173'; // Adjust as needed

exports.getCurrency = onRequest({ secrets: [ipinfoToken] }, (req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, async () => {
    try {
      const xForwardedFor = req.headers['x-forwarded-for'];
      const ip = xForwardedFor
        ? xForwardedFor.split(',')[0].trim()
        : req.socket.remoteAddress;

      if (!ipinfoToken) {
        error('ipinfoToken is not defined');
      }

      const response = await axios.get(
        `https://ipinfo.io/${ip}/json?token=${ipinfoToken.value()}`
      );
      const countryCode = response.data.country;
      const currency = mapCountryToCurrency(countryCode);

      res.json({ currency });
    } catch (error) {
      console.error('Error fetching geolocation:', error.message);
      res.status(500).json({ error: 'Unable to determine currency' });
    }
  });
});

exports.listProducts = onRequest({ secrets: [stripeSecret] }, (req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, async () => {
    try {
      const stripe = require('stripe')(stripeSecret.value());
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
});

exports.listPrices = onRequest({ secrets: [stripeSecret] }, (req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, async () => {
    try {
      if (!req.query.currency) {
        return res.status(400).json({ error: 'Currency is required' });
      }
      const stripe = require('stripe')(stripeSecret.value());
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
});

async function validateShoppingBagItems(lineItems, stripe) {
  const invalidItems = [];

  for (const item of lineItems) {
    const { price: priceId, quantity } = item;

    const price = await stripe.prices.retrieve(priceId);
    // Retrieve product from Stripe
    const productId = price.product;
    const product = await stripe.products.retrieve(productId);

    // Check metadata for "soldout"
    if (product.metadata.sold_out === 'true') {
      invalidItems.push({
        ...item,
        reason: 'This product is marked as sold out',
      });
      continue;
    }

    // Check if the product is active in Stripe
    if (!product.active) {
      invalidItems.push({ ...item, reason: 'Product is inactive' });
    }
  }

  return invalidItems;
}

exports.createCheckoutSession = onRequest(
  { secrets: [stripeSecret] },
  (req, res) => {
    const corsHandler = cors({ origin: true });

    corsHandler(req, res, async () => {
      try {
        const { lineItems, currency } = req.body;

        if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
          return res
            .status(400)
            .send({ error: 'No items in the shopping bag.' });
        }

        if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
          return res.status(400).send({ error: 'Unsupported currency.' });
        }

        const stripe = require('stripe')(stripeSecret.value());
        const invalidItems = await validateShoppingBagItems(lineItems, stripe);

        if (invalidItems.length > 0) {
          return res.status(400).send({
            error: 'Some items are invalid or sold out.',
            invalidItems,
          });
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
  }
);

exports.sessionStatus = onRequest({ secrets: [stripeSecret] }, (req, res) => {
  const corsHandler = cors({ origin: true });

  corsHandler(req, res, async () => {
    try {
      const stripe = require('stripe')(stripeSecret.value());
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
});
