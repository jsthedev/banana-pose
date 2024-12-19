const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);
const priceMapping = require('./priceMapping');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
// If needed, also serve static files from 'public' if deploying them via Hosting

const YOUR_DOMAIN = 'http://localhost:5173'; // Adjust as needed

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { shoppingBagItems } = req.body;

    if (
      !shoppingBagItems ||
      !Array.isArray(shoppingBagItems) ||
      shoppingBagItems.length === 0
    ) {
      return res.status(400).send({ error: 'No items in the shopping bag.' });
    }

    const line_items = shoppingBagItems.map((item) => {
      const priceId = priceMapping[`${item.id}-${item.size}`];
      if (!priceId) {
        throw new Error(`No Stripe price ID found for item ID: ${item.id}`);
      }

      return {
        price: priceId,
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: line_items,
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
