import { useCallback, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

import { ShoppingBagContext } from '@/contexts/ShoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/checkout/checkout_form/index.scss';

const stripePromise = loadStripe(
  import.meta.env.VITE_TEST_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  // Contexts
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);
  const {
    products,
    loading: productsLoading,
    fetchProducts,
  } = useContext(ProductsContext);
  const { state } = useContext(ShoppingBagContext);

  // Loading
  if (currencyLoading || productsLoading) {
    return null;
  }

  // Handle shopping bag rendering issues
  if (!state?.shoppingBagItems || !state.shoppingBagItems?.length) {
    return (
      <div className="empty-prompt">
        <div>Your shopping bag is empty.</div>
      </div>
    );
  }

  // Error
  const [error, setError] = useState(null);

  // Format items for Stripe API
  const lineItems = state.shoppingBagItems
    .map((item) => {
      const productId = item.productId;
      const variantId = item.variantId;
      const size = item.size;

      if (products?.[productId]?.variants?.[variantId]?.sizes?.[size]) {
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
  const fetchClientSecret = useCallback(async () => {
    setError(null); // reset error

    const response = await fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_CREATECHECKOUTSESSION}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineItems,
          currency,
        }),
      }
    );

    // Handle errors from the server
    if (!response.ok) {
      const errorData = await response.json();
      setError(
        errorData.error || 'An error occurred while creating checkout session.'
      );
      throw new Error(errorData.error);
    }

    const data = await response.json();
    return data.clientSecret;
  }, [currency, lineItems]);

  // If an error exists, display it
  if (error) {
    return (
      <div className="checkout-error-wrapper">
        <div className="checkout-error">
          <h2>Checkout Error</h2>
          <p>
            {error} <br />
            Please try again.
          </p>
          <Link to={'/shopping-bag'} className="checkout-error-button-wrapper">
            <div
              className="checkout-error-button link-button"
              onClick={fetchProducts}
            >
              Go to Shopping Bag
            </div>
          </Link>
        </div>
      </div>
    );
  }

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
