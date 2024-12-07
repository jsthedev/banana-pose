import { useRef, useState, useContext } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { Link } from 'react-router-dom';

import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeChartTable from '@/components/size_chart_drawer/size_chart_table/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import { useProduct, useVariant } from '@/contexts/productVariantContext';

import '@/components/product_select/index.scss';

function ProductSelect() {
  const product = useProduct();
  const variant = useVariant();
  const color = variant.color;

  // Color Select
  const [selectedColor, setSelectedColor] = useState(color);
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const colorCapital =
    selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);

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

  // Add to Shopping Bag
  const addToShoppingBag = () => {
    if (selectedSize) {
      dispatch({
        type: 'ADD',
        payload: {
          id: variant.id,
          thumbnail: variant.thumbnail,
          size: selectedSize,
          name: product.name,
          price: product.price,
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
        <div className="product-price">${product.price}</div>
      </div>
      <div className="product-order-form">
        <div className="product-color">Color: {colorCapital}</div>
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
          <SizeSelector sizes={product.sizes} onSizeSelect={handleSizeSelect} />
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
