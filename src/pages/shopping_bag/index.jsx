import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '@/pages/shopping_bag/index.scss';

function ShoppingBag() {
  const [isBagEmpty, setIsBagEmpty] = useState(true);

  return (
    <div className="shopping-bag page">
      <div className="shopping-bag-container">
        <div className="shopping-bag-page-name">Shopping bag</div>
        {isBagEmpty && (
          <div className="empty-prompt">
            <p>Your shopping bag is empty</p>
            <Link to={'/products'} className="continue-shopping-link">
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
        {isBagEmpty === false && (
          <div className="shopping-bag-contents">
            <div className="shopping-bag-item-list"></div>
            <div className="shopping-bag-footer"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingBag;
