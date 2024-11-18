import { useRef } from 'react';

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
        {/* TODO: Implement Select Size function */}
        <div className="size-select-button-wrapper">
          <SizeSelector sizes={product.sizes} />
        </div>
      </div>
      {/* TODO: Implement Buy Button function */}
      <button className="buy-button">Add to Shopping Bag</button>
    </div>
  );
}

export default ProductSelect;
