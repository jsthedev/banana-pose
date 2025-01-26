import { useState, useContext, useEffect } from 'react';
import { ShoppingBagContext } from '@/contexts/shoppingBagContext';
import { Link } from 'react-router-dom';

import ProductDetailsColorSelect from '@/components/color_select/product_details';
import SizeChartDrawer from '@/components/product_details/size_chart_drawer/index.jsx';
import SizeSelector from '@/components/product_details/size_selector/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';
import { CurrencyContext } from '@/contexts/currencyContext';

import { formatPrice } from '@/utils/utilities';

import '@/components/product_details/product_select/index.scss';

function ProductSelect() {
  // Contexts
  const { products, updateProductInventory } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);
  const { currency } = useContext(CurrencyContext);

  // Variables
  const product = products[productId];
  const price = product.price[currency];
  const formattedPrice = formatPrice(price, currency.toUpperCase());

  const variant = product.variants[variantId];
  const name = variant.name;
  const color = variant.color;
  const colorCapital = color.charAt(0).toUpperCase() + color.slice(1);
  const sizes = variant.sizes;

  // Size Chart
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openSizeChartDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Size Select
  const [loadingSizes, setLoadingSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displaySelectedSize, setDisplaySelectedSize] = useState(null);
  const [sizeSelectError, setSizeSelectError] = useState('');

  const [readyForCheckout, setReadyForCheckout] = useState(false);
  const { state, dispatch } = useContext(ShoppingBagContext);

  // Add to Shopping Bag
  const [isLastItem, setIsLastItem] = useState(false);

  const addToShoppingBag = () => {
    // If a size is selected
    if (selectedSize) {
      // Calculate the quantity in shopping bag
      const shoppingBagData = state.shoppingBagItems.find(
        (item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === selectedSize
      );

      // Variables
      const shoppingBagQuantity = shoppingBagData?.quantity || 0;
      const inventory = variant.sizes[selectedSize];

      // If less item in shopping bag than inventory, add the item to the shopping bag
      if (shoppingBagQuantity < inventory) {
        dispatch({
          type: 'ADD',
          payload: {
            size: selectedSize,
            productId: productId,
            variantId: variantId,
          },
        });
      }

      // If the inventory was the last item, notify the user
      if (
        shoppingBagQuantity === inventory ||
        shoppingBagQuantity === inventory - 1
      ) {
        setIsLastItem(true);
      }
      setReadyForCheckout(true);
      setSelectedSize(null);
    }
    // If a size is not selected
    else {
      setSizeSelectError('Please select a size');
    }
  };

  // Handle Size Select
  const handleSizeSelect = async (size) => {
    setReadyForCheckout(false);
    setIsLastItem(false);
    setLoadingSizes(true);
    await updateProductInventory(productId, variantId);
    setSelectedSize(size);
    setDisplaySelectedSize(size);
    setSizeSelectError('');
    setLoadingSizes(false);
  };

  // Reset selected size when color changes
  useEffect(() => {
    setSelectedSize(null);
    setReadyForCheckout(false);
    setSizeSelectError('');
    setIsLastItem(false);
  }, [color]);

  return (
    <div className="product-select">
      <div className="product-metadata">
        <div className="product-name">{name}</div>
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
            variantSizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={handleSizeSelect}
          />
        </div>
      </div>
      {variant?.sizes[selectedSize] === 0 ? (
        <div className="sold-out-button-wrapper">
          <button className="sold-out-button">Sold Out</button>
        </div>
      ) : readyForCheckout ? (
        <div className="checkout-link-wrapper">
          <Link to={'/shopping-bag'} className="checkout-link">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
          {isLastItem ? (
            <div className="last-item-notice">
              Last item is added to your shopping bag.
            </div>
          ) : (
            <div className="checkout-notice">
              Size {displaySelectedSize} added to shopping bag.
            </div>
          )}
        </div>
      ) : (
        <div className="buy-button-wrapper">
          <button
            className={`buy-button ${loadingSizes ? 'loading' : ''}`}
            onClick={addToShoppingBag}
          >
            Add to Shopping Bag
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductSelect;
