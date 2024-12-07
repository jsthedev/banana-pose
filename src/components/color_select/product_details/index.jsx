import { useState } from 'react';
import { Link } from 'react-router-dom';

import colorsData from '@/data/colors.json';

import '@/components/color_select/product_details/index.scss';

function ProductDetailsColorSelect({ product, variant }) {
  const variants = product.variants;
  const currentColor = variant.color;

  const colorMap = colorsData[0];

  return (
    <div className="color-select">
      {variants.map((vari) => (
        <Link to={`/products/${vari.id}`} key={vari.color}>
          <div
            className={`color-card-wrapper ${currentColor === vari.color ? 'selected' : ''}`}
          >
            <div
              className="color-card"
              style={{ backgroundColor: colorMap[vari.color] }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductDetailsColorSelect;
