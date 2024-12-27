import { Link } from 'react-router-dom';

import { formatPrice } from '@/utils/utilities';

import '@/components/shopping_bag/shopping_bag_item_card/index.scss';

function ShoppingBagItemCard({
  item,
  price,
  onDecrement,
  onIncrement,
  onRemove,
}) {
  const { unit_amount, currency } = price || {};

  return (
    <div className="shopping-bag-item">
      <Link to={`/products/${item.id}`}>
        <div className="item-thumbnail">
          <img src={item.thumbnail} alt={`${item.thumbnail}`} />
        </div>
      </Link>
      <div className="shopping-bag-item-contents-wrapper">
        <div className="top-content">
          <div className="item-details">
            <Link to={`/products/${item.id}`} className="item-link">
              <div className="item-name item-detail">{item.name}</div>
            </Link>
            <div className="item-size item-detail">Size: {item.size}</div>
            <div className="item-color item-detail">Color: {item.color}</div>
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
            {unit_amount && currency
              ? formatPrice(unit_amount, currency)
              : 'Price not available'}
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
