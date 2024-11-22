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

  const total = state.shoppingBagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-bag-contents">
      <div className="column-spacer"></div>
      <div className="shopping-bag-item-list">
        {state.shoppingBagItems.map((item) => (
          <div className="shopping-bag-item" key={`${item.id}-${item.size}`}>
            <div className="item-thumbnail">
              <img src={item.thumbnail} alt={`${item.thumbnail}`} />
            </div>
            <div className="shopping-bag-item-contents-wrapper">
              <div className="top-content">
                <div className="item-details">
                  <div className="item-name item-detail">{item.name}</div>
                  <div className="item-size item-detail">Size: {item.size}</div>
                  <div className="item-quantity item-detail">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <div className="item-price">${item.price}</div>
              </div>
              <div className="bottom-content">
                <div
                  className="remove-button normal-link"
                  onClick={() => removeItem(item.id, item.size)}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="column-spacer"></div>
      <div className="shopping-bag-sidebar">
        <div className="order-total sidebar-line">
          <div className="order-total-text">Total:</div>
          <div className="order-total-dollar">$ {total}</div>
        </div>
        <div className="shipping-cost-warning sidebar-line">
          Shipping cost calculated at the checkout
        </div>
        <div className="checkout-button link-button">PROCEED TO CHECKOUT</div>
      </div>
    </div>
  );
}

export default ShoppingBagContents;
