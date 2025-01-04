import { Link } from 'react-router-dom';

import ShoppingBagIcon from '@/components/landing/header/nav_bar/icons/shopping_bag/index.jsx';
import DesktopCurrencySelector from '@/components/currency_selector/desktop_currency_selector/index.jsx';

import '@/components/landing/header/nav_bar/desktop_nav_bar/index.scss';

function DesktopNavBar() {
  return (
    <div className="desktop-nav-bar">
      <div className="logo-wrapper">
        <Link to={'/home'} className="nav-bar-home-link">
          <div className="banana-pose">Banana Pose</div>
        </Link>
      </div>
      <div className="desktop-nav-bar-contents">
        <div className="menu">
          <div className="nav-bar-link-wrapper">
            <Link className="nav-bar-link" to="/products">
              READY TO WEAR
            </Link>
          </div>
          <div className="nav-bar-link-wrapper">
            <Link className="nav-bar-link" to="/our-mission">
              OUR MISSION
            </Link>
          </div>
          <div className="nav-bar-link-wrapper">
            <Link className="nav-bar-link" to="/contact-us">
              CONTACT US
            </Link>
          </div>
        </div>
        <div className="nav-bar-icons">
          <DesktopCurrencySelector />
          <div className="nav-bar-icon-wrapper">
            <ShoppingBagIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopNavBar;
