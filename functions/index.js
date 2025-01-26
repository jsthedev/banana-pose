const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const Stripe = require('stripe');

const stripeSecret = defineSecret('STRIPE_SECRET');
const ipinfoToken = defineSecret('IPINFO_TOKEN');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

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

admin.initializeApp();
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

        const stripe = Stripe(stripeSecret.value());

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
      const stripe = Stripe(stripeSecret.value());
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

exports.handleStripeWebhook = onRequest(
  { secrets: [stripeSecret, stripeWebhookSecret] },
  (req, res) => {
    const corsHandler = cors({ origin: true });

    corsHandler(req, res, async () => {
      const stripe = Stripe(stripeSecret.value());

      const stripeSignature = req.headers['stripe-signature'];

      let event;

      try {
        // Verify the event came from Stripe
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          stripeSignature,
          stripeWebhookSecret
        );
      } catch (error) {
        console.error(
          '⚠️  Webhook signature verification failed.',
          error.message
        );
        return res.status(400).send(`Webhook Error: ${error.message}`);
      }

      // Handle the checkout.session.completed event
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Fulfill the purchase...
        try {
          await fulfillOrder(session);
          res.status(200).send('Success');
        } catch (err) {
          console.error('Error fulfilling order:', err);
          res.status(500).send(`Webhook Error: ${err.message}`);
        }
      } else {
        // Unexpected event type
        res.status(400).end();
      }
    });
  }
);

async function fulfillOrder(session) {
  const stripe = Stripe(stripeSecret.value());

  // Retrieve line items for the session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  const db = admin.firestore();

  // Create promises to update inventory based on each line item
  const updatePromises = lineItems.data.map(async (item) => {
    const stripeProductId = item.price.product;
    const quantity = item.quantity;

    const searchedProduct = await stripe.products.search({
      query: `active:'true' AND id:'${stripeProductId}'`,
    });

    const productId = searchedProduct.metadata.bp_product_id;
    const variantId = searchedProduct.metadata.variant_id;
    const sizeId = searchedProduct.metadata.size;

    if (!productId || !variantId || !sizeId) {
      throw new Error(
        'Missing product, variant, or size information in line item.'
      );
    }

    const sizeRef = db
      .collection('products')
      .doc(productId)
      .collection('variants')
      .doc(variantId)
      .collection('sizes')
      .doc(sizeId);

    // Create a transaction to decrement inventory on Firestore DB
    await db.runTransaction(async (transaction) => {
      const sizeDoc = await transaction.get(sizeRef);
      if (!sizeDoc.exists) {
        throw new Error(
          `Size ${sizeId} does not exist for variant ${variantId}.`
        );
      }

      const currentInventory = sizeDoc.data().inventory || 0;
      const newInventory = currentInventory - quantity;

      if (newInventory < 0) {
        throw new Error(
          `Insufficient inventory for product ${productId}, variant ${variantId}, size ${sizeId}.`
        );
      }

      // Update the inventory
      transaction.update(sizeRef, { inventory: newInventory });
    });
  });
  await Promise.all(updatePromises);
}
