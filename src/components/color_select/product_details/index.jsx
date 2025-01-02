import { Link } from 'react-router-dom';

import colorsData from '@/data/colors.json';

import '@/components/color_select/product_details/index.scss';

function ProductDetailsColorSelect({ product, variant }) {
  const variants = product.variants;
  const currentColor = variant.color;

  const colorMap = colorsData;

  return (
    <div className="color-select">
      {Object.keys(variants).map((variantId) => (
        <Link to={`/products/${variantId}`} key={variantId}>
          <div
            className={`color-card-wrapper ${currentColor === variants[variantId].color ? 'selected' : ''}`}
          >
            <div
              className="color-card"
              style={{ backgroundColor: variants[variantId].color }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductDetailsColorSelect;
