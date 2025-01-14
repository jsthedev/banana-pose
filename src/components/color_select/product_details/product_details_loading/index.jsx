import '@/components/color_select/product_details/product_details_loading/index.scss';

function ProductDetailsColorSelectLoading({ product }) {
  const variants = product.variants;

  return (
    <div className="color-select">
      {Object.keys(variants).map((variantId, index) => (
        <div
          className={`color-card-wrapper ${index === 0 ? 'selected' : ''}`}
          key={variantId}
        >
          <div className="color-card" style={{ backgroundColor: 'white' }} />
        </div>
      ))}
    </div>
  );
}

export default ProductDetailsColorSelectLoading;
