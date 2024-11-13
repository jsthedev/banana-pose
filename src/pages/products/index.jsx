import "@/pages/products/index.scss";
import productsData from "@/assets/data/products.js";

function ProductsPage() {
  return (
    <div className="products-page page">
      <div className="products-gallery">
        {productsData.length > 0 &&
          productsData.map((product) => (
            <div key={product.id} className="product-container">
              <div className="img-wrapper">
                <img src={product.thumbnail} />
              </div>
              <div className="description">
                <div className="name">{product.name}</div>
                <div className="price">{product.price}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductsPage;
