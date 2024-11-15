import { Link } from 'react-router-dom';

import '@/components/product_card/index.scss';

function ProductCard({ id, name, thumbnail, price }) {
  return (
    <div className="card">
      <div className="product">
        <div className="product-img-wrapper normal-link">
          <Link to={`/products/${id}`}>
            <img src={thumbnail} alt={name} className="product-img" />
          </Link>
        </div>
        <div className="product-info">
          <Link to={`/products/${id}`} className="normal-link">
            <div className="product-name normal-link">{name}</div>
          </Link>
          <div className="product-price">$ {price}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
