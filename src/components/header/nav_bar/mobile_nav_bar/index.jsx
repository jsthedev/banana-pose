import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import ShoppingBagIcon from '@/components/header/nav_bar/icons/shopping_bag/index.jsx';

import '@/components/header/nav_bar/mobile_nav_bar_contents/index.scss';

// TODO:
// 1. Create Shopping Bag Page and connect to faBagShopping
// 2. Create vertical menu and connect to isMobileMenuOpen

function MobileNavBar() {
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="mobile-nav-bar">
      <div className="mobile-nav-bar-top-contents">
        <div className="logo-wrapper">
          <Link to={'/home'} className="nav-bar-home-link">
            <div className="banana-pose">Banana Pose</div>
          </Link>
        </div>
        <div className="mobile-nav-bar-contents">
          <div className="nav-bar-icons">
            <div className="nav-bar-icon-wrapper">
              <ShoppingBagIcon />
            </div>
            <div className="nav-bar-icon-wrapper">
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="nav-bar-icon"
                onClick={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="expandable-menu">
          <div className="expandable-menu-contents">
            <div className="expandable-menu-links">
              <div className="nav-link-wrapper">
                <Link
                  to={'/products'}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  READY TO WEAR
                </Link>
              </div>
            </div>
            {/* TODO: Add contacts */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavBar;
