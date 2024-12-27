import { Link } from 'react-router-dom';

import '@/components/header/checkout_nav_bar/index.scss';

function CheckoutNavBar() {
  return (
    <div className="nav-bar">
      <div className="checkout-nav-bar">
        <div className="logo-wrapper">
          <Link to={'/home'} className="nav-bar-home-link">
            <div className="banana-pose">Banana Pose</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutNavBar;
