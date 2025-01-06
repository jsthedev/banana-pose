import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '@/utils/utilities';

import { CurrencyContext } from '@/contexts/currencyContext';

import '@/components/shopping_bag/shopping_bag_item_card/index.scss';

function ShoppingBagItemCard({
  item,
  price,
  onDecrement,
  onIncrement,
  onRemove,
}) {
  const colorCapital = item.color.charAt(0).toUpperCase() + item.color.slice(1);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  if (currencyLoading) {
    return null;
  }

  return (
    <div className="shopping-bag-item">
      <Link to={`/products/${item.productVariant}`}>
        <div className="item-thumbnail">
          <img src={item.thumbnail} alt={`${item.thumbnail}`} />
        </div>
      </Link>
      <div className="shopping-bag-item-contents-wrapper">
        <div className="top-content">
          <div className="item-details">
            <Link to={`/products/${item.productVariant}`} className="item-link">
              <div className="item-name item-detail">{item.name}</div>
            </Link>
            <div className="item-size item-detail">Size: {item.size}</div>
            <div className="item-color item-detail">Color: {colorCapital}</div>
            <div className="item-quantity item-detail">
              <div className="quantity-text">Quantity:</div>
              <button
                className="decrement-button"
                onClick={() => onDecrement(item.id, item.size)}
              >
                -
              </button>
              <div className="quantity-number">{item.quantity}</div>
              <button
                className="increment-button"
                onClick={() => onIncrement(item.id, item.size)}
              >
                +
              </button>
            </div>
          </div>
          <div className="item-price">
            {price ? formatPrice(price, currency) : 'Price not available'}
          </div>
        </div>
        <div className="bottom-content">
          <div
            className="remove-button normal-link"
            onClick={() => onRemove(item.id, item.size)}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBagItemCard;
