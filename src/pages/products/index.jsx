import { useContext } from 'react';

import ProductCard from '@/components/product_card/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/products/index.scss';

function Products() {
  const { products, loading: productsLoading } = useContext(ProductsContext);

  if (productsLoading) {
    return null;
  }

  return (
    <div className="products">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {Object.keys(products).map((productId) => (
              <ProductCard key={`${productId}`} productId={productId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
