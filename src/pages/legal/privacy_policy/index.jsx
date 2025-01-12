import '@/pages/legal/index.scss';

const lastUpdate = 'Jan 11, 2025';

function PrivacyPolicy() {
  return (
    <div className="legal">
      <div className="title">Privacy Policy</div>
      <div className="text">
        <h5>Last Updated: {lastUpdate}</h5>
        <p>
          At Banana Pose, we value your privacy. This Privacy Policy explains
          how we handle personal information in compliance with Ontario's PIPEDA
          and related regulations. By using our website and services, you
          acknowledge that you have read and understood these policies.
        </p>
        <h4>Information Collection and Use</h4>
        <ul>
          <li>
            We do not directly collect personal data on our website. All
            privacy-sensitive information (such as names, addresses, payment
            details, and delivery information) is collected and processed by our
            payment partner, Stripe.
          </li>
          <li>
            Stripe uses this information solely to verify payments and
            facilitate delivery. We do not access or store these details beyond
            what is necessary to fulfill orders and meet legal obligations.
          </li>
        </ul>
        <h4>Data Sharing and Security</h4>
        <ul>
          <li>
            Your data is protected by Stripe's security measures, and we do not
            share your personal information with third parties beyond Stripe.
          </li>
          <li>
            We retain customer information only as long as necessary to complete
            transactions and comply with legal requirements.
          </li>
        </ul>
        <h4>Customer Rights</h4>
        <ul>
          <li>
            You may request access to, correction of, or deletion of your
            personal information by contacting us at info@bananapose.com.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
