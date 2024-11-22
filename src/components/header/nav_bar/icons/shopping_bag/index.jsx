import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import 'src/components/header/nav_bar/icons/shopping_bag/index.scss';

function ShoppingBagIcon() {
  return (
    <div className="shopping-bag-icon-wrapper">
      <Link to={'/shoppingbag'} className="shopping-bag-icon-link">
        <FontAwesomeIcon icon={faBagShopping} className="shopping-bag-icon" />
      </Link>
    </div>
  );
}

export default ShoppingBagIcon;
