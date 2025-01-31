import { useCallback, useContext, useState } from 'react';
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
    fetchProducts,
  } = useContext(ProductsContext);
  const { state, dispatch } = useContext(ShoppingBagContext);

  // Error
  const [error, setError] = useState(null);
  const [lackInventoryItems, setLackInventoryItems] = useState([]);

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

        // If inventory is not enough, return error
        if (latestInventory < item.quantity) {
          setError('insufficient inventory');
          setLackInventoryItems([
            ...lackInventoryItems,
            {
              size: size,
              productId: productId,
              variantId: variantId,
              inventory: latestInventory,
            },
          ]);
          return;
        }

        return;
      });

      await Promise.all(inventoryPromises);

      // Create checkout session
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_FUNCTIONS_CREATECHECKOUTSESSION}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shoppingBagItems: state.shoppingBagItems,
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
      <div className="empty-prompt-wrapper">
        <div className="empty-prompt">
          <div className="shopping-bag-page-name">Checkout</div>
          <div className="empty-prompt-contents">
            <p>Your shopping bag is empty</p>
            <Link to={'/products'} className="link-button">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If an error exists, display it
  if (error) {
    return (
      <div className="checkout-error-wrapper">
        <div className="checkout-error">
          <h3>Checkout Error</h3>
          {lackInventoryItems.length > 0 ? (
            <div className="checkout-error-inventories">
              {lackInventoryItems.map((item, index) => (
                <p key={index}>
                  {products[item.productId].variants[item.variantId].name} color{' '}
                  {products[item.productId].variants[item.variantId].color} size{' '}
                  {item.size} has {item.inventory} items left.
                </p>
              ))}
            </div>
          ) : (
            <p className="checkout-error-message">{error}</p>
          )}
          <p>Please try again.</p>
        </div>
        <Link
          to={'/shopping-bag'}
          className="checkout-error-button link-button"
          onClick={fetchProducts}
        >
          Go to Shopping Bag
        </Link>
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
