import { useCallback, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

import { ShoppingBagContext } from '@/contexts/ShoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';

const stripePromise = loadStripe(
  import.meta.env.VITE_TEST_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);
  const { products, loading: productsLoading } = useContext(ProductsContext);
  const { state } = useContext(ShoppingBagContext);

  // Loading
  if (currencyLoading || productsLoading) {
    return null;
  }

  // Handle shopping bag rendering issues
  if (
    state.shoppingBagItems === undefined ||
    state.shoppingBagItems.length == 0
  ) {
    return (
      <div className="empty-prompt">
        <div>Your shopping bag is empty.</div>
      </div>
    );
  }

  // Format items for Stripe API
  const lineItems = state.shoppingBagItems
    .map((item) => {
      const productId = item.productId;
      const variantId = item.variantId;
      const size = item.size;

      if (products[productId]?.variants[variantId]?.sizes?.[size]) {
        return {
          price: products[productId].variants[variantId].sizes[size],
          quantity: item.quantity,
        };
      } else {
        console.warn(
          `Product or variant not found for ${productId}, ${variantId}, ${size}`
        );
        return null;
      }
    })
    .filter(Boolean);

  // Create a Checkout Session
  const fetchClientSecret = useCallback(() => {
    return fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_ENDPOINT}/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineItems: lineItems,
          currency: currency,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [currency, state.shoppingBagItems]);

  const options = { fetchClientSecret };

  return (
    <div className="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutForm;
