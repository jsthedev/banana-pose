const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);

const app = express();
app.use(cors({ origin: true }));
// If needed, also serve static files from 'public' if deploying them via Hosting

const YOUR_DOMAIN = 'http://localhost:5173'; // Adjust as needed

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1QUp5rP2TrmAZ42h9igVUyNF', // Replace with your actual price ID
          quantity: 1,
        },
      ],
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
