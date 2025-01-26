import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '@/utils/utilities';
import { getSize } from '@/firebase/productsDB';

import { CurrencyContext } from '@/contexts/currencyContext';
import { ProductsContext } from '@/contexts/productsContext';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import '@/components/shopping_bag/shopping_bag_item_card/index.scss';

function ShoppingBagItemCard({ item }) {
  // Contexts
  const { currency } = useContext(CurrencyContext);
  const { products, updateSizeInventory } = useContext(ProductsContext);
  const { dispatch } = useContext(ShoppingBagContext);

  // Variables
  const quantity = item.quantity;
  const size = item.size;
  const productId = item.productId;
  const variantId = item.variantId;
  const variant = products[productId].variants[variantId];
  const inventory = variant.sizes[size];
  const thumbnail = products[productId].variants[variantId].thumbnail;
  const name = variant.name;
  const price = products[productId].price[currency] || 'N/A';
  const color = variant.color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);

  // Checks if inventory is more than the quantity
  const isLessInventory = async () => {
    // Fetch latest inventory for this item
    const latestInventory = await updateSizeInventory(
      productId,
      variantId,
      size
    );

    // If there is more quantity then inventory, update quantity
    if (variant.sizes[size] < quantity) {
      dispatch({
        type: 'SET_QUANTITY',
        payload: {
          size: size,
          productId: productId,
          variantId: variantId,
          setNumber: latestInventory,
        },
      });
      return false;
    }
    return true;
  };

  // Dispatch Methods
  const decrementItem = async (productId, variantId, size) => {
    const proceed = await isLessInventory();
    // Decrement if quantity is less than inventory
    if (proceed) {
      dispatch({
        type: 'DECREMENT',
        payload: { productId, variantId, size },
      });
    }
  };

  const incrementItem = async (productId, variantId, size) => {
    const proceed = await isLessInventory();
    // Increment if quantity is less than inventory
    if (proceed) {
      dispatch({
        type: 'INCREMENT',
        payload: { productId, variantId, size },
      });
    }
  };

  const removeItem = (productId, variantId, size) => {
    dispatch({
      type: 'REMOVE',
      payload: { productId, variantId, size },
    });
  };

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
                className={`decrement-button ${quantity === 1 || quantity === 0 ? 'hide' : ''}`}
                onClick={() => decrementItem(productId, variantId, size)}
              >
                -
              </button>
              <div className="quantity-number">{quantity}</div>
              <button
                className={`increment-button ${quantity === inventory ? 'hide' : ''}`}
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
