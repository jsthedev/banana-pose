import '@/pages/legal/index.scss';

const lastUpdate = 'Jan 11, 2025';

function TermsAndConditions() {
  return (
    <div className="legal">
      <div className="title">Terms and Conditions</div>
      <div className="text">
        <h5>Last Updated: {lastUpdate}</h5>
        <p>
          By using the Banana Pose website and purchasing our clothing products,
          you agree to the following terms and conditions:
        </p>
        <h4>General Terms</h4>
        <ul>
          <li>
            Banana Pose is a sole proprietorship based in Toronto, Ontario,
            Canada. These Terms govern your use of our website and the purchase
            of our products.
          </li>
        </ul>
        <h4>Payments and Orders</h4>
        <ul>
          <li>
            All transactions are processed via Stripe. By purchasing from Banana
            Pose, you agree to Stripe's payment processing terms.
          </li>
          <li>
            Prices listed include applicable taxes but exclude shipping charges,
            which are free for all international orders.
          </li>
        </ul>
        <h4>Intellectual Property</h4>
        <ul>
          <li>
            All content on this website, including product images and
            descriptions, is the property of Banana Pose and protected by
            intellectual property laws.
          </li>
        </ul>
        <h4>Limitation of Liability</h4>
        <ul>
          <li>
            Banana Pose is not liable for any indirect, incidental, or
            consequential damages arising from the use or inability to use our
            website or products.
          </li>
          <li>
            Product descriptions are accurate to the best of our knowledge, but
            we do not guarantee error-free information.
          </li>
        </ul>
        <h4>Dispute Resolution</h4>
        <ul>
          <li>
            Any disputes arising from these Terms or your purchases will be
            handled amicably and, if necessary, resolved through mediation in
            Ontario.
          </li>
        </ul>
        <h4>Governing Law</h4>
        <ul>
          <li>These Terms are governed by the laws of Ontario, Canada.</li>
        </ul>
      </div>
    </div>
  );
}

export default TermsAndConditions;
