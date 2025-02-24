import { useContext } from "react";

import ProductCard from "@/components/products/product_card/index.jsx";
import LoadingProductCard from "@/components/products/product_card/loading_product_card";

import { ProductsContext } from "@/contexts/productsContext";

import "@/pages/products/index.scss";

function Products() {
  // Contexts
  const { products, loading: productsLoading } = useContext(ProductsContext);

  return (
    <div className="products">
      <div className="products-page-main">
        <div className="product-list-wrapper">
          <div className="product-list">
            {productsLoading
              ? Array.from({ length: import.meta.env.VITE_NUM_PRODUCTS }).map(
                  (_, index) => <LoadingProductCard key={index} />
                )
              : Object.keys(products).map((productId) => (
                  <ProductCard key={`${productId}`} productId={productId} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
