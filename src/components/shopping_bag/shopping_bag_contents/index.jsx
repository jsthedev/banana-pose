import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';

import ShoppingBagItemCard from '@/components/shopping_bag/shopping_bag_item_card/index.jsx';

import { formatPrice } from '@/utils/utilities';

import '@/components/shopping_bag/shopping_bag_contents/index.scss';

function ShoppingBagContents() {
  const { state, dispatch } = useContext(ShoppingBagContext);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);
  const { products, loading: productsLoading } = useContext(ProductsContext);

  if (currencyLoading || productsLoading) {
    return null;
  }

  const incrementItem = (id, size) => {
    dispatch({
      type: 'INCREMENT',
      payload: { id, size },
    });
  };

  const decrementItem = (id, size) => {
    dispatch({
      type: 'DECREMENT',
      payload: { id, size },
    });
  };

  const removeItem = (id, size) => {
    dispatch({
      type: 'REMOVE',
      payload: { id, size },
    });
  };

  const total = state.shoppingBagItems.reduce((acc, item) => {
    const lastUnderscoreIndex = item.productVariant.lastIndexOf('_');
    const productId = item.productVariant.substring(0, lastUnderscoreIndex);
    const itemPrice = products[productId].price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="shopping-bag-contents">
      <div className="column-spacer left-column"></div>
      <div className="shopping-bag-item-list-wrapper">
        <div className="shopping-bag-page-name">Shopping bag</div>
        <div className="shopping-bag-item-list">
          {state.shoppingBagItems.map((item) => {
            const lastUnderscoreIndex = item.productVariant.lastIndexOf('_');
            const productId = item.productVariant.substring(
              0,
              lastUnderscoreIndex
            );
            const price = products[productId].price || 'N/A'; // Display 'N/A' if price is not available

            return (
              <ShoppingBagItemCard
                key={`${item.id}-${item.size}`}
                item={item}
                price={price}
                onDecrement={decrementItem}
                onIncrement={incrementItem}
                onRemove={removeItem}
              />
            );
          })}
        </div>
      </div>
      <div className="column-spacer right-column"></div>
      <div className="shopping-bag-sidebar">
        <div className="order-total">
          <div className="order-total-text">Total:</div>
          <div className="order-total-dollar">
            {formatPrice(total, currency.toUpperCase())}
          </div>
        </div>
        <div className="shipping-cost-warning">
          Shipping cost calculated at the checkout
        </div>
        <Link to={'/checkout'}>
          <div className="checkout-button link-button">Proceed to Checkout</div>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingBagContents;
