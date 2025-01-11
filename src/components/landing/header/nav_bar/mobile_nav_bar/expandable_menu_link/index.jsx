import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '@/components/landing/header/nav_bar/mobile_nav_bar/expandable_menu_link/index.scss';

function ExpandableMenuLink({ link, closeMobileMenu, text }) {
  return (
    <div className="expandable-menu-link-wrapper">
      <Link
        to={link}
        className="expandable-menu-link"
        onClick={closeMobileMenu}
      >
        <div className="expandable-menu-link-text">{text}</div>
        <div className="chevron-right">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
    </div>
  );
}

export default ExpandableMenuLink;
