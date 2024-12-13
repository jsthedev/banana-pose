// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();

const stripe = require('stripe')(functions.config().stripe.secret_key);

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const { amount, currency } = data;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
