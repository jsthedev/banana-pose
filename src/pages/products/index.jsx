import '@/pages/products/index.scss';

import ProductCard from '@/pages/products/product_card/index.jsx';

import products from '@/data/products.json';

function Products() {
  return (
    <div className="products page">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
