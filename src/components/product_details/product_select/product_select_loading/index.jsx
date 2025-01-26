import { useContext } from 'react';

import ProductDetailsColorSelectLoading from '@/components/color_select/product_details/product_details_loading';
import SizeSelector from '@/components/product_details/size_selector/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';

import '@/components/product_details/product_select/product_select_loading/index.scss';

function ProductSelectLoading() {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId } = useContext(ProductVariantIdsContext);

  // Variables
  const product = products?.[productId];

  const sizes = ['1', '2', '3', '4', '5'];

  const handleSizeSelect = () => {
    return;
  };

  return (
    <div className="loading-product-select">
      <div className="loading-product-metadata">
        <div className="loading-product-name">Name</div>
        <div className="loading-product-price">
          <span>$100</span>
        </div>
      </div>
      <div className="loading-product-order-form">
        <div className="loading-product-color">Color: </div>
        <ProductDetailsColorSelectLoading />
        <div className="size-chart-click-wrapper">
          <div className="size-chart-click normal-link">Size Guide</div>
        </div>
        <div className="size-select-button-wrapper">
          <SizeSelector
            variantSizes={sizes}
            selectedSize={'non-empty-string'}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </div>
      <button className="buy-button">Add to Shopping Bag</button>
    </div>
  );
}

export default ProductSelectLoading;
