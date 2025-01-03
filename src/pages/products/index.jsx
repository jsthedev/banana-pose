import { useContext } from 'react';

import ProductCard from '@/components/product_card/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/products/index.scss';

function Products() {
  // TODO 20250101: Get products from context and filter out products without prices

  const { products } = useContext(ProductsContext);

  return (
    <div className="products page">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {Object.entries(products).map(([productId, product]) => (
              <ProductCard
                key={`${productId}`}
                productId={productId}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
