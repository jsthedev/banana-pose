import { useCallback, useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
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
    updateSizeInventory,
  } = useContext(ProductsContext);
  const { state, dispatch } = useContext(ShoppingBagContext);

  // Error
  const [error, setError] = useState(null);

  // Create a Checkout Session
  const fetchClientSecret = useCallback(async () => {
    setError(null); // reset error

    try {
      // Inventory Check
      const inventoryPromises = state.shoppingBagItems.map(async (item) => {
        const { productId, variantId, size } = item;

        // update the size inventory
        const latestInventory = await updateSizeInventory(
          productId,
          variantId,
          size
        );

        // If more quantity than inventory, adjust the quantity
        if (latestInventory < item.quantity) {
          dispatch({
            type: 'SET_QUANTITY',
            payload: {
              size: size,
              productId: productId,
              variantId: variantId,
              setNumber: latestInventory,
            },
          });
        }

        if (latestInventory === 0) {
          return null;
        } else if (latestInventory < item.quantity) {
          return {
            ...item,
            quantity: latestInventory,
          };
        } else {
          return item;
        }
      });

      const updatedBagItems = (await Promise.all(inventoryPromises)).filter(
        (item) => item !== null
      );

      console.log(updatedBagItems);

      // Create checkout session
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_FUNCTIONS_CREATECHECKOUTSESSION}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shoppingBagItems: updatedBagItems,
            currency: currency,
          }),
        }
      );

      // Handle errors from the server
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.error ||
            'An error occurred while creating checkout session.'
        );
        throw new Error(errorData.error);
      }

      const data = await response.json();

      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, [
    currency,
    products,
    updateSizeInventory,
    dispatch,
    state.shoppingBagItems,
  ]);

  // Loading
  if (currencyLoading || productsLoading) {
    return null;
  }

  // If shopping bag is empty, return error
  if (!state?.shoppingBagItems || !state.shoppingBagItems?.length) {
    return (
      <div className="empty-prompt">
        <div>Your shopping bag is empty.</div>
      </div>
    );
  }

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
            <div className="checkout-error-button link-button">
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
