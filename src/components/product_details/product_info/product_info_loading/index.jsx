import { useContext } from 'react';

import ProductSelectLoading from '@/components/product_details/product_select/product_select_loading/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';

import '@/components/product_details/product_info/product_info_loading/index.scss';

function ProductInfoLoading() {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId } = useContext(ProductVariantIdsContext);

  // Variables
  const product = products[productId];

  return (
    <div className="loading-product-info-wrapper">
      <div className="loading-product-info">
        <ProductSelectLoading />
        <div className="loading-product-description-wrapper">
          <div className="loading-product-description">
            {product.description}
          </div>
        </div>
        <div className="loading-product-details-list-wrapper">
          <div className="loading-product-details-toggle">
            Product details +
          </div>
        </div>
        <div className="loading-product-care-wrapper">
          <div className="loading-product-care-toggle">Care instructions +</div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoLoading;
