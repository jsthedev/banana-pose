import { useContext } from 'react';

import ProductCard from '@/components/products/product_card/index.jsx';
import LoadingProductCard from '@/components/products/product_card/loading_product_card';

import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/products/index.scss';

function Products() {
  // Contexts
  const { products, loading: productsLoading } = useContext(ProductsContext);

  return (
    <div className="products">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {Object.keys(products).map((productId) =>
              productsLoading ? (
                <LoadingProductCard key={`${productId}`} />
              ) : (
                <ProductCard key={`${productId}`} productId={productId} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
