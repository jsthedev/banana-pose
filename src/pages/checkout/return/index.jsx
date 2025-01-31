import { useState, useEffect, useContext } from 'react';

import { ProductsContext } from '@/contexts/productsContext';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import TextLoader from '@/components/text_loader';

import '@/pages/checkout/return/index.scss';

function Return() {
  // Contexts
  const { fetchProducts } = useContext(ProductsContext);
  const { dispatch } = useContext(ShoppingBagContext);

  // States
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  // Confirm the checkout status
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      setStatus('invalid');
      return;
    }

    fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_SESSIONSTATUS}?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error('Error fetching session status:', error);
        setStatus('error');
      });
  }, []);

  // Clear shopping bag after checkout
  useEffect(() => {
    if (status === 'complete') {
      dispatch({ type: 'CLEAR' });
    }
  }, [status, dispatch]);

  // If checkout not compledted, go back to checkout session
  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'invalid') {
    return (
      <div className="checkout-error-wrapper">
        <div className="checkout-error">
          <h2>Invalid Session</h2>
          <p>
            The checkout session is invalid or has expired. Please try again.
          </p>
          <Link to={'/shopping-bag'} className="link-button">
            Go to Shopping Bag
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="checkout-error-wrapper">
        <div className="checkout-error">
          <h2>Checkout Error</h2>
          <p>
            An error occurred while processing your checkout. Please try again.
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

  // If checkout completed, prompt message
  if (status === 'complete') {
    fetchProducts();

    return (
      <section id="success" className="return-complete">
        <p>
          We appreciate your business! <br />A confirmation email will be sent
          to {customerEmail}. <br />
          <br />
          If you have any questions, please email{' '}
          <a href="mailto:orders@bananapose.com">orders@bananapose.com</a>.
        </p>
      </section>
    );
  }

  // Loading state
  return (
    <div className="loader-wrapper">
      <TextLoader />
    </div>
  );
}

export default Return;
