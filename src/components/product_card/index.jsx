import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import ProductCardColorSelect from '@/components/color_select/product_card/index.jsx';

import { formatPrice } from '@/utils/utilities';

import { CurrencyContext } from '@/contexts/currencyContext';

import '@/components/product_card/index.scss';

// TODO: fix price fetching when page refreshed

function ProductCard({ productId, product }) {
  // TODO: 20250101 For each variant, filter out variants without property "sizes"
  // TODO: 20250101 Create list of colors available
  // TODO: 20250101 When checkout use bpId + variantId + sizeId to get priceId and checkout

  const { price, variants } = product;

  const [selectedVariantId, setSelectedVariantId] = useState(
    Object.keys(variants)[0]
  );
  const selectedVariant = variants[selectedVariantId];
  const name = selectedVariant?.name || '';
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  if (!variants || !selectedVariantId || currencyLoading) {
    return <></>;
  }

  // Color Select
  const handleColorSelect = (selectedColor) => {
    const variantId = Object.keys(variants).find(
      (id) => variants[id].color === selectedColor
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
            selectedColor={variants[selectedVariantId].color}
            colors={Object.keys(variants).map(
              (variantId) => variants[variantId].color
            )}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
