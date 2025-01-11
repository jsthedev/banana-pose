import { useContext, useState } from 'react';

import ProductSelect from '@/components/product_select/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';

import '@/components/product_info/index.scss';

function ProductInfo() {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId } = useContext(ProductVariantIdsContext);

  // Variables
  const product = products[productId];

  // Product Details
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Product Care Instructions
  const [showCare, setShowCare] = useState(false);
  const toggleCare = () => {
    setShowCare(!showCare);
  };

  return (
    <div className="product-info-wrapper">
      <div className="product-info">
        <ProductSelect />
        <div className="product-description-wrapper">
          <div className="product-description">{product.description}</div>
        </div>
        <div className="product-details-list-wrapper">
          <div
            className="product-details-toggle"
            onClick={() => toggleDetails()}
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
          <div className="product-care-toggle" onClick={() => toggleCare()}>
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
