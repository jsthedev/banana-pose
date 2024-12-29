import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { CurrencyContext } from '@/contexts/currencyContext';

import ShoppingBagItemCard from '@/components/shopping_bag/shopping_bag_item_card/index.jsx';

import { formatPrice } from '@/utils/utilities';

import '@/components/shopping_bag/shopping_bag_contents/index.scss';

function ShoppingBagContents() {
  const { state, dispatch } = useContext(ShoppingBagContext);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchPrices = async (currentCurrency) => {
    if (state.shoppingBagItems.length === 0) {
      setPrices({});
      return;
    }

    setLoading(true);
    setError(null);

    const priceRequests = state.shoppingBagItems.map((item) => ({
      productId: item.id,
      size: item.size,
      currency: currentCurrency,
    }));

    try {
      const response = await fetch(
        'http://127.0.0.1:5001/banana-pose/us-central1/api/get-prices',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prices: priceRequests }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch prices.');
      }

      const data = await response.json();

      if (data.results) {
        const priceMap = {};
        data.results.forEach((result) => {
          if (result.success && result.price) {
            const key = `${priceRequests[result.index].productId}-${priceRequests[result.index].size}-${priceRequests[result.index].currency}`;
            priceMap[key] = {
              unit_amount: result.price.unit_amount,
              currency: result.price.currency.toUpperCase(),
            };
          }
        });
        setPrices(priceMap);
      } else {
        throw new Error('Invalid response format.');
      }
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError('Unable to update prices. Please try again later.');
      setPrices({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices(currency);
  }, [state.shoppingBagItems.length, currency]);

  const total = state.shoppingBagItems.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${currency.toUpperCase()}`;
    const itemPrice = prices[key]?.unit_amount || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="shopping-bag-contents">
      <div className="column-spacer left-column"></div>
      <div className="shopping-bag-item-list-wrapper">
        <div className="shopping-bag-page-name">Shopping bag</div>
        <div className="shopping-bag-item-list">
          {state.shoppingBagItems.map((item) => {
            const key = `${item.id}-${item.size}-${currency.toUpperCase()}`;
            const price = prices[key] || 'N/A'; // Display 'N/A' if price is not available

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
