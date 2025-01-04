import { useState, useEffect, useContext } from 'react';

import { ShoppingBagContext } from '@/contexts/ShoppingBagContext';

import '@/pages/checkout/return/index.scss';

function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  const { dispatch } = useContext(ShoppingBagContext);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(
      `http://127.0.0.1:5001/banana-pose/us-central1/api/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  useEffect(() => {
    if (status === 'complete') {
      dispatch({ type: 'CLEAR' });
    }
  }, [status, dispatch]);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

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
