import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ProductCardColorSelect from "@/components/color_select/product_card/index.jsx";

import { formatPrice } from "@/utils/utilities";

import { ProductsContext } from "@/contexts/productsContext";
import { CurrencyContext } from "@/contexts/currencyContext";

import "@/components/products/product_card/index.scss";

function ProductCard({ productId }) {
  // Contexts
  const { products, isSoldOut } = useContext(ProductsContext);
  const { currency } = useContext(CurrencyContext);

  // Product
  const product = products[productId];

  // Handle Variant
  const variants = products[productId]?.variants;
  const variantIds = Object.keys(variants);
  const [variantId, setVariantId] = useState(variantIds[0]);
  const variant = variants[variantId];

  // Sold Out
  const isVariantSoldOut = isSoldOut(productId, variantId);
  console.log(isVariantSoldOut);

  // Variables to be shown
  const name = variant?.name || "";
  const price = product?.price[currency];

  // Color Select
  const handleColorSelect = (selectedColor) => {
    const selectedVariantId = variantIds.find(
      (id) => variants[id]?.color === selectedColor
    );
    if (selectedVariantId) {
      setVariantId(selectedVariantId);
    }
  };

  return (
    <div className="card">
      <div className="product">
        <div className="product-image-content">
          <div className="product-img-wrapper normal-link">
            <Link to={`/products/${productId}_${variantId}`}>
              {isVariantSoldOut ? (
                <div className="sold-out">Sold Out</div>
              ) : null}
              <img src={variant.thumbnail} alt={name} className="product-img" />
            </Link>
          </div>
        </div>
        <div className="product-info">
          <div className="product-name">
            <Link
              to={`/products/${productId}_${variantId}`}
              className="normal-link"
            >
              <div className="normal-link">{name}</div>
            </Link>
          </div>
          <div className="product-price">
            <span>{formatPrice(price, currency.toUpperCase())}</span>
          </div>
        </div>
        <div className="color-cards">
          <ProductCardColorSelect
            selectedColor={variants[variantId].color}
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
