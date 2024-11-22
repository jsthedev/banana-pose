import { useRef, useState, useContext } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeChartTable from '@/components/size_chart_drawer/size_chart_table/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import 'src/components/product_select/index.scss';

function ProductSelect({ product }) {
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
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeSelectError('');
  };

  // Add to Shopping Bag
  const { dispatch } = useContext(ShoppingBagContext);
  const addToShoppingBag = () => {
    if (selectedSize) {
      dispatch({
        type: 'ADD',
        payload: {
          id: product.id,
          thumbnail: product.thumbnail,
          size: selectedSize,
          name: product.name,
          price: product.price,
        },
      });
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
        <div className="product-color">Color: {product.color}</div>
        <div className="size-chart-click-wrapper">
          <div
            className="size-chart-click normal-link"
            onClick={handleSizeGuideClick}
          >
            Size Chart
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
      <button className="buy-button" onClick={addToShoppingBag}>
        Add to Shopping Bag
      </button>
    </div>
  );
}

export default ProductSelect;
