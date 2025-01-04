import { useContext } from "react";

import ProductCard from "@/components/product_card/index.jsx";

import { ProductsContext } from "@/contexts/productsContext";

import "@/pages/products/index.scss";

function Products() {
  const { products } = useContext(ProductsContext);

  if (!products) {
    return <div className="page" />;
  }

  const filteredProducts = Object.fromEntries(
    Object.entries(products).filter(([_, product]) => product.price)
  );

  return (
    <div className="products page">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {Object.entries(filteredProducts).map(([productId, product]) => (
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
