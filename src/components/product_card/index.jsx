import { useState } from 'react';
import { Link } from 'react-router-dom';

import ProductCardColorSelect from '@/components/color_select/product_card/index.jsx';

import '@/components/product_card/index.scss';

function ProductCard({ product }) {
  const { id, name, price, variants } = product;

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // Color Select
  const handleColorSelect = (color) => {
    const variant = variants.find((variant) => variant.color === color);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  return (
    <div className="card">
      <div className="product">
        <div className="product-img-wrapper normal-link">
          <Link to={`/products/${selectedVariant.id}`}>
            <img
              src={selectedVariant.thumbnail}
              alt={name}
              className="product-img"
            />
          </Link>
        </div>
        <div className="product-info">
          <Link to={`/products/${selectedVariant.id}`} className="normal-link">
            <div className="product-name normal-link">{name}</div>
          </Link>
          <div className="product-price">$ {price}</div>
        </div>
        <div className="color-cards">
          <ProductCardColorSelect
            color={selectedVariant.color}
            colors={variants.map((variant) => variant.color)}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
