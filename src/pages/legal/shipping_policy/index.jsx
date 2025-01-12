import '@/pages/legal/index.scss';

const lastUpdate = 'Jan 11, 2025';

function ShippingPolicy() {
  return (
    <div className="legal">
      <div className="title">Shipping Policy</div>
      <div className="text">
        <h5>Last Updated: {lastUpdate}</h5>
        <p>
          By using our website and services, you acknowledge that you have read
          and understood these policies.
        </p>
        <h4>Shipping Costs and Delivery</h4>
        <ul>
          <li>
            We offer free domestic and international shipping on all orders.
          </li>
          <li>
            Orders are processed and shipped within 1-2 business days after
            payment confirmation.
          </li>
          <li>
            Delivery times vary by destination and will be communicated via
            email once the order has shipped.
          </li>
        </ul>
        <h4>Responsibility</h4>
        <ul>
          <li>
            Once an order is shipped, Banana Pose is not responsible for delays
            caused by customs or shipping carriers.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ShippingPolicy;
