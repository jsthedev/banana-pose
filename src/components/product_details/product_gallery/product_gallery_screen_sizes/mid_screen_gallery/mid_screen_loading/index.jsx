import ProductInfoLoading from '@/components/product_details/product_info/product_info_loading';
import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/product_details/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/mid_screen_loading/index.scss';

// at 1139px, carousel-nav should disappear
function MidScreenLoading() {
  // Variables
  const images = ['image1', 'image2', 'image3', 'image4'];

  return (
    <div className="mid-screen-gallery">
      <div className="carousel-main">
        {images.map((photo) => (
          <div className="carousel-cell" key={photo}>
            <SkeletonImageLoader />
          </div>
        ))}
      </div>
      <div className="product-info-container">
        <ProductInfoLoading />
      </div>
    </div>
  );
}

export default MidScreenLoading;
