import { Link } from 'react-router-dom';

import '@/pages/products/product_card/index.scss';

function ProductCard({ id, name, image, price }) {
  return (
    <div className="card">
      {/* <Link to={`/products/${id}`} className="product normal-link"> */}
      <div className="product normal-link">
        <div className="product-img-wrapper">
          <img src={image} alt={name} className="product-img" />
        </div>
        <div className="product-info">
          <div className="product-name">{name}</div>
          <div className="product-price">$ {price}</div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default ProductCard;
