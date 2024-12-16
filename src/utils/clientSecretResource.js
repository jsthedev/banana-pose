import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app';

const functions = getFunctions(getApp());
const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');

export function getClientSecret({ amount, currency }) {
  return createPaymentIntent({ amount, currency }).then(
    (result) => result.data.clientSecret
  );
}
