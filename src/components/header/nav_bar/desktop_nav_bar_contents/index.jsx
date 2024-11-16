import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

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
        <FontAwesomeIcon icon={faBagShopping} />
      </div>
    </div>
  );
}

export default DesktopNavBarContents;
