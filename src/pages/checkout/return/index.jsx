import { useState, useEffect, useContext } from 'react';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import '@/pages/checkout/return/index.scss';

function Return() {
  // Contexts
  const { dispatch } = useContext(ShoppingBagContext);

  // States
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  // Confirm the checkout status
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(
      `${import.meta.env.VITE_FIREBASE_FUNCTIONS_SESSIONSTATUS}?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
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

  // If checkout completed, prompt message
  if (status === 'complete') {
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

  return null;
}

export default Return;
