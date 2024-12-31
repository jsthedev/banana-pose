import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductCardColorSelect from "@/components/color_select/product_card/index.jsx";

import { formatPrice } from "@/utils/utilities";

import { CurrencyContext } from "@/contexts/currencyContext";

import "@/components/product_card/index.scss";

// TODO: fix price fetching when page refreshed

function ProductCard({ product }) {
  // TODO: 20250101 For each variant, filter out variants without property "sizes"
  // TODO: 20250101 Create list of colors available
  // TODO: 20250101 When checkout use bpId + variantId + sizeId to get priceId and checkout

  const { id, name, variants } = product;

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  // Price state
  const [price, setPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState("");

  const fetchPrice = async (currentCurrency) => {
    try {
      setPriceLoading(true);
      setPriceError("");

      const response = await axios.get(
        "http://127.0.0.1:5001/banana-pose/us-central1/api/get-price",
        {
          params: {
            productId: selectedVariant.id,
            size: "Template",
            currency: currentCurrency,
          },
        }
      );

      if (response.data.price) {
        setPrice(response.data.price);
      } else {
        setPriceError("Price not available.");
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      setPriceError("Unable to fetch price.");
    } finally {
      setPriceLoading(false);
    }
  };

  useEffect(() => {
    if (selectedVariant.id && currency) {
      fetchPrice(currency);
    }
  }, [currency, selectedVariant.id]);

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
          <div className="product-price">
            {priceLoading && <span>Loading price...</span>}
            {priceError && <span>{priceError}</span>}
            {price && !priceLoading && !priceError && (
              <span>
                {formatPrice(price.unit_amount, price.currency.toUpperCase())}
              </span>
            )}
          </div>
        </div>
        <div className="color-cards">
          <ProductCardColorSelect
            selectedColor={selectedVariant.color}
            colors={variants.map((variant) => variant.color)}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
