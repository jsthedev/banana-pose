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

const YOUR_DOMAIN = 'https://bananapose.com'; // Adjust as needed

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

exports.createCheckoutSession = onRequest(
  { secrets: [stripeSecret] },
  (req, res) => {
    const corsHandler = cors({ origin: true });

    corsHandler(req, res, async () => {
      try {
        const { shoppingBagItems, currency } = req.body;

        // Validate shoppingBagItems
        if (
          !shoppingBagItems ||
          !Array.isArray(shoppingBagItems) ||
          shoppingBagItems.length === 0
        ) {
          return res
            .status(400)
            .send({ error: 'No items in the shopping bag.' });
        }

        // Validate currency
        if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
          return res.status(400).send({ error: 'Unsupported currency.' });
        }

        const stripe = require('stripe')(stripeSecret.value());

        // Create a promise to find price IDs from Stripe
        const lineItemPromises = shoppingBagItems.map(async (item) => {
          const { size, productId, variantId, quantity } = item;

          // If quantity is 0, skip
          if (quantity === 0) {
            return;
          }

          // Search for a product based on metadata
          const searchedProduct = await stripe.products.search({
            query: `active:'true' AND metadata['bp_product_id']:'${productId}' AND metadata['variant_id']:'${variantId}' AND metadata['size']:'${size}'`,
          });

          // Always expecting one product ID from Stripe
          const stripeProductId = searchedProduct?.data?.[0]?.id;

          if (!stripeProductId) {
            return;
          }

          // search for a price based on product ID and currency
          const searchedPrice = await stripe.prices.search({
            query: `active:'true' AND product:'${stripeProductId}' AND currency:'${currency}'`,
          });

          const stripePriceId = searchedPrice?.data?.[0]?.id;

          return { price: stripePriceId, quantity: quantity };
        });

        // Generate lineItems based on the lineItemPromises
        const lineItems = (await Promise.all(lineItemPromises)).filter(Boolean);

        // List available countries to order from
        const countries = mapCurrencyToCountries(currency);

        // create a checkout session
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: lineItems,
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
