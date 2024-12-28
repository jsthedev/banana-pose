import ProductCard from "@/components/product_card/index.jsx";

import products from "@/data/products.json";

import "@/pages/products/index.scss";

function Products() {
  return (
    <div className="products page">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {products.map((product) => (
              <ProductCard key={`${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
