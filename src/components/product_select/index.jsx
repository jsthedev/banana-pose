import { useRef, useState, useContext, useEffect } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProductDetailsColorSelect from '@/components/color_select/product_details';
import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeChartTable from '@/components/size_chart_drawer/size_chart_table/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import { useProduct, useVariant } from '@/contexts/productVariantContext';
import { CurrencyContext } from '@/contexts/currencyContext';

import { formatPrice } from '@/utils/utilities';

import '@/components/product_select/index.scss';

function ProductSelect() {
  const product = useProduct();
  const variant = useVariant();
  const color = variant.color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  // Size Chart
  const sizeChartRef = useRef();
  const handleSizeGuideClick = () => {
    if (sizeChartRef.current) {
      sizeChartRef.current.open();
    }
  };

  // Size Select
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeSelectError, setSizeSelectError] = useState('');

  const [addedToBag, setAddedToBag] = useState(false);
  const { dispatch } = useContext(ShoppingBagContext);

  // Price state
  const [price, setPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState('');

  const fetchPrice = async (currentCurrency) => {
    try {
      setPriceLoading(true);
      setPriceError('');

      const response = await axios.get(
        'http://127.0.0.1:5001/banana-pose/us-central1/api/get-price',
        {
          params: {
            productId: variant.id,
            size: 'Template',
            currency: currentCurrency,
          },
        }
      );

      if (response.data.price) {
        setPrice(response.data.price);
      } else {
        setPriceError('Price not available.');
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      setPriceError('Unable to fetch price.');
    } finally {
      setPriceLoading(false);
    }
  };

  useEffect(() => {
    if (variant.id && currency) {
      fetchPrice(currency);
    }
  }, [currency, variant.id]);

  const handleSizeSelect = (size) => {
    if (size !== selectedSize) {
      setAddedToBag(false);
    }
    setSelectedSize(size);
    setSizeSelectError('');
  };

  // Reset selected size when color changes
  useEffect(() => {
    setSelectedSize(null);
    setAddedToBag(false);
    setSizeSelectError('');
  }, [color]);

  // Add to Shopping Bag
  const addToShoppingBag = () => {
    if (selectedSize) {
      dispatch({
        type: 'ADD',
        payload: {
          id: variant.id,
          thumbnail: variant.thumbnail,
          color: colorCapital,
          size: selectedSize,
          name: product.name,
        },
      });
      setAddedToBag(true);
    } else {
      setSizeSelectError('Please select a size');
    }
  };

  return (
    <div className="product-select">
      <div className="product-metadata">
        <div className="product-name">{product.name}</div>
        <div className="product-price">
          {priceLoading && <span>Loading price...</span>}
          {priceError && <span>{priceError}</span>}
          {price && !priceLoading && !priceError && (
            <span>
              {formatPrice(price.unit_amount, price.currency.toUpperCase())}
            </span>
          )}
        </div>
      </div>
      <div className="product-order-form">
        <div className="product-color">Color: {colorCapital}</div>
        <ProductDetailsColorSelect product={product} variant={variant} />
        <div className="size-chart-click-wrapper">
          <div
            className="size-chart-click normal-link"
            onClick={handleSizeGuideClick}
          >
            Size Guide
          </div>
          <SizeChartDrawer ref={sizeChartRef}>
            <SizeChartTable />
          </SizeChartDrawer>
        </div>
        {sizeSelectError && (
          <div className="size-error-message error-style">
            {sizeSelectError}
          </div>
        )}
        <div className="size-select-button-wrapper">
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </div>
      {addedToBag ? (
        <div className="checkout-link-wrapper">
          <Link to={'/shopping-bag'} className="checkout-link">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
          <div className="checkout-notice">
            Size {selectedSize} added to shopping bag.
          </div>
        </div>
      ) : (
        <button className="buy-button" onClick={addToShoppingBag}>
          Add to Shopping Bag
        </button>
      )}
    </div>
  );
}

export default ProductSelect;
