import '@/pages/legal/index.scss';

const lastUpdate = 'Jan 11, 2025';

function ReturnPolicy() {
  return (
    <div className="legal">
      <div className="title">Return Policy</div>
      <div className="text">
        <h5>Last Updated: {lastUpdate}</h5>
        <p>
          By using our website and services, you acknowledge that you have read
          and understood these policies.
        </p>
        <h4>Eligibility</h4>
        <ul>
          <li>
            Customers have 30 days from the delivery date to file a return.
          </li>
          <li>
            To be eligible for a return, items must be in perfect condition with
            the original tags attached.
          </li>
        </ul>
        <h4>Return Process</h4>
        <ul>
          <li>
            Contact us at orders@bananapose.com to initiate a return. We will
            provide instructions on how to ship the item back.
          </li>
          <li>The customer is responsible for return shipping costs.</li>
        </ul>
        <h4>Refunds and Exchanges</h4>
        <ul>
          <li>
            Upon receiving and inspecting the returned item, we will process a
            refund or exchange based on your preference.
          </li>
          <li>
            Refunds will be issued to the original method of payment via Stripe.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReturnPolicy;
