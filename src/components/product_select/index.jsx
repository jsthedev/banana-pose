import { useState, useContext, useEffect } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { Link } from 'react-router-dom';

import ProductDetailsColorSelect from '@/components/color_select/product_details';
import SizeChartDrawer from '@/components/size_chart_drawer/index.jsx';
import SizeSelector from '@/components/size_selector/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';
import { CurrencyContext } from '@/contexts/currencyContext';

import { formatPrice } from '@/utils/utilities';

import '@/components/product_select/index.scss';

function ProductSelect() {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);
  const { currency } = useContext(CurrencyContext);

  // Variables
  const product = products[productId];
  const price = product.price;
  const formattedPrice = formatPrice(price, currency.toUpperCase());

  const variant = product.variants[variantId];
  const color = variant.color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);

  // Size Chart
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openSizeChartDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Size Select
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeSelectError, setSizeSelectError] = useState('');

  const [addedToBag, setAddedToBag] = useState(false);
  const { dispatch } = useContext(ShoppingBagContext);

  const handleSizeSelect = (size) => {
    if (size !== selectedSize) {
      setAddedToBag(false);
    }
    setSelectedSize(size);
    setSizeSelectError('');
  };

  // Reset selected size when color changes
  useEffect(() => {
    setSelectedSize(null);
    setAddedToBag(false);
    setSizeSelectError('');
  }, [color]);

  // Add to Shopping Bag
  const addToShoppingBag = () => {
    if (selectedSize) {
      dispatch({
        type: 'ADD',
        payload: {
          size: selectedSize,
          productId: productId,
          variantId: variantId,
        },
      });
      setAddedToBag(true);
    } else {
      setSizeSelectError('Please select a size');
    }
  };

  return (
    <div className="product-select">
      <div className="product-metadata">
        <div className="product-name">{variant.name}</div>
        <div className="product-price">
          <span>{formattedPrice}</span>
        </div>
      </div>
      <div className="product-order-form">
        <div className="product-color">Color: {colorCapital}</div>
        <ProductDetailsColorSelect
          product={product}
          productId={productId}
          variant={variant}
        />
        <div className="size-chart-click-wrapper">
          <div
            className="size-chart-click normal-link"
            onClick={openSizeChartDrawer}
          >
            Size Guide
          </div>
          <SizeChartDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
        {sizeSelectError && (
          <div className="size-error-message error-style">
            {sizeSelectError}
          </div>
        )}
        <div className="size-select-button-wrapper">
          <SizeSelector
            variantSizes={variant.sizes}
            selectedSize={selectedSize}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </div>
      {variant?.sizes[selectedSize] === 'sold_out' ? (
        <div className="sold-out-button-wrapper">
          <button className="sold-out-button">Sold Out</button>
        </div>
      ) : addedToBag ? (
        <div className="checkout-link-wrapper">
          <Link to={'/shopping-bag'} className="checkout-link">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
          <div className="checkout-notice">
            Size {selectedSize} added to shopping bag.
          </div>
        </div>
      ) : (
        <button className="buy-button" onClick={addToShoppingBag}>
          Add to Shopping Bag
        </button>
      )}
    </div>
  );
}

export default ProductSelect;
