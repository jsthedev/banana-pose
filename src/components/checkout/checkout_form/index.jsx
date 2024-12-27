import { useCallback, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

import { ShoppingBagContext } from '@/contexts/ShoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';

const stripePromise = loadStripe(
  import.meta.env.VITE_TEST_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  const { state, dispatch } = useContext(ShoppingBagContext);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(
      'http://127.0.0.1:5001/banana-pose/us-central1/api/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shoppingBagItems: state.shoppingBagItems,
          currency: currency,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [currency, state.shoppingBagItems]);

  const options = { fetchClientSecret };

  if (currencyLoading) {
    return <div>Loading...</div>; // Optional: Show a loading state
  }

  return (
    <div id="checkout" className="page">
      <div className="embedded-wrapper">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

export default CheckoutForm;
