import { useRef, useState } from 'react';

import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import '@/components/product_info/index.scss';

function ProductInfo({ product }) {
  // Size Guide
  const sizeChartRef = useRef();
  const handleSizeGuideClick = () => {
    if (sizeChartRef.current) {
      sizeChartRef.current.open();
    }
  };

  // Product Details
  const [showDetails, setShowDetails] = useState(false);

  // Product Care Instructions
  const [showCare, setShowCare] = useState(false);

  return (
    <div className="product-info-wrapper">
      <div className="product-info">
        <div className="product-metadata">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}</div>
        </div>
        <div className="product-order-form">
          <div className="product-color">Color: {product.color}</div>
          <div className="size-guide-wrapper">
            <div
              className="size-guide normal-link"
              onClick={handleSizeGuideClick}
            >
              Size Guide
            </div>
            <SizeChartDrawer ref={sizeChartRef} />
          </div>
          {/* TODO: Implement Select Size function */}
          <div className="size-select-button-wrapper">
            <SizeSelector sizes={product.sizes} />
          </div>
        </div>
        {/* TODO: Implement Buy Button function */}
        <button className="buy-button">Add to Shopping Bag</button>
        <div className="product-description-wrapper">
          <div className="product-description">{product.description}</div>
        </div>
        <div className="product-details-list-wrapper">
          <div
            className="product-details-toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            Product details
          </div>
          {showDetails && (
            <ul
              className={`product-details-list expandable-list ${showDetails ? 'expanded' : 'collapsed'}`}
            >
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="product-care-wrapper">
          <div
            className="product-care-toggle"
            onClick={() => setShowCare(!showCare)}
          >
            Care instructions
          </div>
          {showCare && (
            <ul
              className={`product-care-list expandable-list ${showCare ? 'expanded' : 'collapsed'}`}
            >
              {product.care.map((care, index) => (
                <li key={index}>{care}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
