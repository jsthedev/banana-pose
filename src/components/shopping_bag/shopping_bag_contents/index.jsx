import { useContext } from 'react';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import ShoppingBagItemCard from '@/components/shopping_bag/shopping_bag_item_card/index.jsx';

import '@/components/shopping_bag/shopping_bag_contents/index.scss';

// TODO: implement link to checkout page
function ShoppingBagContents() {
  const { state, dispatch } = useContext(ShoppingBagContext);

  const removeItem = (id, size) => {
    dispatch({
      type: 'REMOVE',
      payload: { id, size },
    });
  };

  const total = state.shoppingBagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-bag-contents">
      <div className="column-spacer left-column"></div>
      <div className="shopping-bag-item-list-wrapper">
        <div className="shopping-bag-page-name">Shopping bag</div>
        <div className="shopping-bag-item-list">
          {state.shoppingBagItems.map((item) => (
            <ShoppingBagItemCard
              key={`${item.id}-${item.size}`}
              item={item}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>
      <div className="column-spacer right-column"></div>
      <div className="shopping-bag-sidebar">
        <div className="order-total">
          <div className="order-total-text">Total:</div>
          <div className="order-total-dollar">$ {total}</div>
        </div>
        <div className="shipping-cost-warning">
          Shipping cost calculated at the checkout
        </div>
        <div className="checkout-button link-button">PROCEED TO CHECKOUT</div>
      </div>
    </div>
  );
}

export default ShoppingBagContents;
