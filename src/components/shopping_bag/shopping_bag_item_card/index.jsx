import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '@/utils/utilities';

import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import '@/components/shopping_bag/shopping_bag_item_card/index.scss';

function ShoppingBagItemCard({ item }) {
  // Contexts
  const { currency } = useContext(CurrencyContext);
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(ShoppingBagContext);

  // Dispatch Methods
  const decrementItem = (productId, variantId, size) => {
    dispatch({
      type: 'DECREMENT',
      payload: { productId, variantId, size },
    });
  };

  const incrementItem = (productId, variantId, size) => {
    dispatch({
      type: 'INCREMENT',
      payload: { productId, variantId, size },
    });
  };

  const removeItem = (productId, variantId, size) => {
    dispatch({
      type: 'REMOVE',
      payload: { productId, variantId, size },
    });
  };

  // Variables
  const productId = item.productId;
  const variantId = item.variantId;
  const size = item.size;
  const quantity = item.quantity;
  const thumbnail = products[productId].variants[variantId].thumbnail;
  const name = products[productId].variants[variantId].name;
  const price = products[productId].price || 'N/A';
  const color = products[productId].variants[variantId].color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);

  return (
    <div className="shopping-bag-item">
      <Link to={`/products/${productId}_${variantId}`}>
        <div className="item-thumbnail">
          <img src={thumbnail} alt={`${name} thumbnail`} />
        </div>
      </Link>
      <div className="shopping-bag-item-contents-wrapper">
        <div className="top-content">
          <div className="item-details">
            <Link
              to={`/products/${productId}_${variantId}`}
              className="item-link"
            >
              <div className="item-name item-detail">{name}</div>
            </Link>
            <div className="item-size item-detail">Size: {size}</div>
            <div className="item-color item-detail">Color: {colorCapital}</div>
            <div className="item-quantity item-detail">
              <div className="quantity-text">Quantity:</div>
              <button
                className="decrement-button"
                onClick={() => decrementItem(productId, variantId, size)}
              >
                -
              </button>
              <div className="quantity-number">{quantity}</div>
              <button
                className="increment-button"
                onClick={() => incrementItem(productId, variantId, size)}
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
            onClick={() => removeItem(productId, variantId, size)}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBagItemCard;
