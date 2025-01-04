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
  const { state } = useContext(ShoppingBagContext);
  const { currency } = useContext(CurrencyContext);
  const { products } = useContext(ProductsContext);

  const lineItems = state.shoppingBagItems
    .map((item) => {
      const productVariant = item.productVariant;
      const lastUnderscoreIndex = productVariant.lastIndexOf('_');
      const productId = productVariant.substring(0, lastUnderscoreIndex);
      const variantId = productVariant.substring(lastUnderscoreIndex + 1);
      const size = item.size;
      console.log(products);

      if (products[productId]?.variants?.[variantId]?.sizes?.[size]) {
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
