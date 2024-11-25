import { Link } from 'react-router-dom';

import '@/components/shopping_bag/shopping_bag_item_card/index.scss';

function ShoppingBagItemCard({ item, onRemove }) {
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
            <div className="item-quantity item-detail">
              Quantity: {item.quantity}
            </div>
          </div>
          <div className="item-price">${item.price}</div>
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
