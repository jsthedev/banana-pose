import { useState, useEffect } from 'react';

import '@/components/checkout/return/index.scss';

function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

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

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success" className="page return-complete">
        <p>
          We appreciate your business! <br />A confirmation email will be sent
          to {customerEmail}. <br />
          <br />
          If you have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@bananapose.com</a>.
        </p>
      </section>
    );
  }

  return null;
}

export default Return;
