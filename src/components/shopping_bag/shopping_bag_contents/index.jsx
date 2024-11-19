import { useContext } from 'react';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import '@/components/shopping_bag/shopping_bag_contents/index.scss';

// TODO: implement styling and link to checkout page
function ShoppingBagContents() {
  const { state, dispatch } = useContext(ShoppingBagContext);
  const removeItem = (id, size) => {
    dispatch({
      type: 'REMOVE',
      payload: { id, size },
    });
  };
  return (
    <div className="shopping-bag-contents">
      <div className="shopping-bag-item-list">
        {state.shoppingBagItems.map((item) => (
          <div className="shopping-bag-item" key={`${item.id}-${item.size}`}>
            <div className="item-details">
              <span className="item-name">Product ID: {item.id}</span>
              <span className="item-size">Size: {item.size}</span>
              <span className="item-quantity">Quantity: {item.quantity}</span>
            </div>
            <button
              className="remove-button"
              onClick={() => removeItem(item.id, item.size)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="shopping-bag-footer">
        <div>Checkout Link Placeholder</div>
      </div>
    </div>
  );
}

export default ShoppingBagContents;
