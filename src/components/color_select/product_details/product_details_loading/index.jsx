import '@/components/color_select/product_details/product_details_loading';

function ProductDetailsColorSelectLoading() {
  return (
    <div className="color-select">
      <div className={`color-card-wrapper selected`}>
        <div className="color-card" style={{ backgroundColor: 'white' }} />
      </div>
    </div>
  );
}

export default ProductDetailsColorSelectLoading;
