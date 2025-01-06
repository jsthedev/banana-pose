import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ProductCardColorSelect from '@/components/color_select/product_card/index.jsx';

import { formatPrice } from '@/utils/utilities';

import { CurrencyContext } from '@/contexts/currencyContext';

import '@/components/product_card/index.scss';

function ProductCard({ productId, product }) {
  const { price, variants } = product;

  const filteredVariants = Object.fromEntries(
    Object.entries(variants).filter(([_, variant]) => variant.sizes)
  );

  const [selectedVariantId, setSelectedVariantId] = useState(
    Object.keys(filteredVariants)[0]
  );
  const selectedVariant = filteredVariants[selectedVariantId];
  const name = selectedVariant?.name || '';
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  if (!filteredVariants || !selectedVariantId) {
    return <></>;
  }

  if (currencyLoading) {
    return null;
  }

  // Color Select
  const handleColorSelect = (selectedColor) => {
    const variantId = Object.keys(filteredVariants).find(
      (id) => filteredVariants[id].color === selectedColor
    );
    if (variantId) {
      setSelectedVariantId(variantId);
    }
  };

  return (
    <div className="card">
      <div className="product">
        <div className="product-img-wrapper normal-link">
          <Link to={`/products/${productId}_${selectedVariantId}`}>
            <img
              src={selectedVariant.thumbnail}
              alt={name}
              className="product-img"
            />
          </Link>
        </div>
        <div className="product-info">
          <Link
            to={`/products/${productId}_${selectedVariantId}`}
            className="normal-link"
          >
            <div className="product-name normal-link">{name}</div>
          </Link>
          <div className="product-price">
            <span>{formatPrice(price, currency.toUpperCase())}</span>
          </div>
        </div>
        <div className="color-cards">
          <ProductCardColorSelect
            selectedColor={filteredVariants[selectedVariantId].color}
            colors={Object.keys(filteredVariants).map(
              (variantId) => filteredVariants[variantId].color
            )}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
