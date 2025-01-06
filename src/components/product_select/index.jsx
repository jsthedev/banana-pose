import { useRef, useState, useContext, useEffect } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { Link, useParams } from 'react-router-dom';

import ProductDetailsColorSelect from '@/components/color_select/product_details';
import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeChartTable from '@/components/size_chart_drawer/size_chart_table/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import { useProductVariantContext } from '@/contexts/productVariantContext';
import { CurrencyContext } from '@/contexts/currencyContext';

import { formatPrice } from '@/utils/utilities';

import '@/components/product_select/index.scss';

function ProductSelect() {
  const { productVariant } = useParams();
  const lastUnderscoreIndex = productVariant.lastIndexOf('_');
  const productId = productVariant.substring(0, lastUnderscoreIndex);
  const { product, variant } = useProductVariantContext();
  const color = variant.color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);
  const price = product.price;

  if (currencyLoading) {
    return null;
  }

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
          thumbnail: variant.thumbnail,
          color: color,
          size: selectedSize,
          name: variant.name,
          productVariant: productVariant,
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
        <div className="product-name">{variant.name}</div>
        <div className="product-price">
          <span>{formatPrice(price, currency.toUpperCase())}</span>
        </div>
      </div>
      <div className="product-order-form">
        <div className="product-color">Color: {colorCapital}</div>
        <ProductDetailsColorSelect
          product={product}
          productId={productId}
          variant={variant}
        />
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
            sizes={Object.keys(variant.sizes)}
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
