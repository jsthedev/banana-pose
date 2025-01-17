import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';

import ShoppingBagItemCardLoading from '@/components/shopping_bag/shopping_bag_item_card/loading/index.jsx';
import ShoppingBagItemCard from '@/components/shopping_bag/shopping_bag_item_card/index.jsx';

import { formatPrice } from '@/utils/utilities';

import '@/components/shopping_bag/shopping_bag_contents/index.scss';

function ShoppingBagContents() {
  // Contexts
  const { state } = useContext(ShoppingBagContext);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);
  const { products, loading: productsLoading } = useContext(ProductsContext);

  // Variables
  const total = state.shoppingBagItems.reduce((acc, item) => {
    const productId = item.productId;
    const itemPrice = products[productId].price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="shopping-bag-contents">
      <div className="column-spacer left-column"></div>
      <div className="shopping-bag-item-list-wrapper">
        <div className="shopping-bag-page-name">Shopping bag</div>
        <div className="shopping-bag-item-list">
          {state.shoppingBagItems.map((item, index) => {
            return currencyLoading || productsLoading ? (
              <ShoppingBagItemCardLoading key={index} />
            ) : (
              <ShoppingBagItemCard key={index} item={item} />
            );
          })}
        </div>
      </div>
      <div className="column-spacer right-column"></div>
      <div className="shopping-bag-sidebar">
        <div className="order-total">
          <div className="order-total-text">Total:</div>
          <div className="order-total-dollar">
            {currencyLoading || productsLoading
              ? ''
              : formatPrice(total, currency.toUpperCase())}
          </div>
        </div>
        <div className="shipping-cost-warning">
          Shipping cost calculated at the checkout
        </div>
        <Link to={'/checkout'} className="checkout-button-wrapper">
          <div className="checkout-button link-button">Proceed to Checkout</div>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingBagContents;
