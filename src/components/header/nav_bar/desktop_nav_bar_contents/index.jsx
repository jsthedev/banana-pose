import { Link } from 'react-router-dom';

import ShoppingBagIcon from '@/components/header/nav_bar/icons/shopping_bag/index.jsx';

import 'src/components/header/nav_bar/desktop_nav_bar_contents/index.scss';

// TODO:
// 1. Create Shopping Bag Page and connect to faBagShopping

function DesktopNavBarContents() {
  return (
    <div className="desktop-nav-bar-contents">
      <div className="menu">
        <Link className="nav-bar-products-link" to="/products">
          READY TO WEAR
        </Link>
      </div>
      <div className="nav-bar-icons">
        <div className="nav-bar-icon-wrapper">
          <ShoppingBagIcon />
        </div>
      </div>
    </div>
  );
}

export default DesktopNavBarContents;
