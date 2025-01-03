import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import ShoppingBagIcon from '@/components/header/nav_bar/icons/shopping_bag/index.jsx';
import MobileCurrencySelector from '@/components/currency_selector/mobile_currency_selector/index.jsx';

import '@/components/header/nav_bar/mobile_nav_bar/index.scss';

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
          <Link
            to={'/home'}
            className="nav-bar-home-link"
            onClick={closeMobileMenu}
          >
            <div className="banana-pose">Banana Pose</div>
          </Link>
        </div>
        <div className="mobile-nav-bar-contents">
          <div className="nav-bar-icons">
            <div className="nav-bar-icon-wrapper" onClick={closeMobileMenu}>
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
                  <div className="nav-link-text">READY TO WEAR</div>
                  <div className="chevron-right">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>
              </div>
              <div className="nav-link-wrapper">
                <Link
                  to={'/our-mission'}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  <div className="nav-link-text">OUR MISSION</div>
                  <div className="chevron-right">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>
              </div>
              <div className="nav-link-wrapper">
                <Link
                  to={'/contact-us'}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  <div className="nav-link-text">CONTACT US</div>
                  <div className="chevron-right">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </Link>
              </div>
            </div>
            <div className="currency-selector-wrapper">
              <MobileCurrencySelector />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavBar;
