import { Link } from 'react-router-dom';

import ShoppingBagIcon from '@/components/header/nav_bar/icons/shopping_bag/index.jsx';
import CurrencySelector from '@/components/currency_selector';

import 'src/components/header/nav_bar/desktop_nav_bar/index.scss';

// TODO:
// 1. Create Shopping Bag Page and connect to faBagShopping

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
          <CurrencySelector />
          <div className="nav-bar-icon-wrapper">
            <ShoppingBagIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopNavBar;
