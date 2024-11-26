import { useState } from 'react';

import ProductSelect from '@/components/product_select/index.jsx';

import '@/components/product_info/index.scss';

function ProductInfo({ product }) {
  // Product Details
  const [showDetails, setShowDetails] = useState(false);

  // Product Care Instructions
  const [showCare, setShowCare] = useState(false);

  return (
    <div className="product-info-wrapper">
      <div className="product-info">
        <ProductSelect product={product} />
        <div className="product-description-wrapper">
          <div className="product-description">{product.description}</div>
        </div>
        <div className="product-details-list-wrapper">
          <div
            className="product-details-toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            Product details {showDetails ? '-' : '+'}
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
            Care instructions {showCare ? '-' : '+'}
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
