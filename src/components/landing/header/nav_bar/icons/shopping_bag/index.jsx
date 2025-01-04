import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import 'src/components/header/nav_bar/icons/shopping_bag/index.scss';

function ShoppingBagIcon() {
  const { state } = useContext(ShoppingBagContext);
  const { shoppingBagItems } = state;
  const totalItems = shoppingBagItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="shopping-bag-icon-wrapper">
      <Link to={'/shopping-bag'} className="shopping-bag-icon-link">
        <FontAwesomeIcon icon={faBagShopping} className="shopping-bag-icon" />
        {totalItems > 0 && (
          <span className="shopping-bag-count">{totalItems}</span>
        )}
      </Link>
    </div>
  );
}

export default ShoppingBagIcon;
