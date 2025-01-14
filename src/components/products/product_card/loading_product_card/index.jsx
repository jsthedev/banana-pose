import ProductCardColorSelect from '@/components/color_select/product_card/index.jsx';
import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/products/product_card/loading_product_card/index.scss';

function LoadingProductCard() {
  // Variables to be shown
  const colors = ['white'];

  // Color Select
  const handleColorSelect = () => {
    return;
  };

  return (
    <div className="card">
      <div className="loading-product">
        <div className="loading-product-image-content">
          <div className="loading-product-img-wrapper">
            <SkeletonImageLoader />
          </div>
        </div>
        <div className="loading-product-info">
          <div className="loading-product-name">
            <div>name</div>
          </div>
          <div className="loading-product-price">
            <span>price</span>
          </div>
        </div>
        <div className="color-cards">
          <ProductCardColorSelect
            selectedColor={'white'}
            colors={colors}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingProductCard;
