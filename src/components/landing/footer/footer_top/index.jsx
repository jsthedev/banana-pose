import { Link } from 'react-router-dom';

import '@/components/landing/footer/footer_top/index.scss';

function FooterTop() {
  return (
    <div className="footer-top">
      <div className="footer-top-contents">
        <div className="footer-top-link-wrapper">
          <Link className="footer-top-link" to="/legal/privacy-policy">
            PRIVACY
          </Link>
        </div>
        <div className="footer-top-link-wrapper">
          <Link className="footer-top-link" to="/legal/shipping-policy">
            SHIPPING
          </Link>
        </div>
        <div className="footer-top-link-wrapper">
          <Link className="footer-top-link" to="/legal/return-policy">
            RETURN
          </Link>
        </div>
        <div className="footer-top-link-wrapper">
          <Link className="footer-top-link" to="/legal/terms-and-conditions">
            TERMS & CONDITIONS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
