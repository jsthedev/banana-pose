import ProductInfo from '@/components/product_info/index.jsx';

import '@/components/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/index.scss';
import { useVariant } from '@/contexts/productVariantContext';

// at 1139px, carousel-nav should disappear
function MidScreenGallery() {
  const variant = useVariant();
  const images = variant.images;

  return (
    <div className="mid-screen-gallery">
      <div className="carousel-main">
        {images.map((photo, index) => (
          <div className="carousel-cell" key={index} id={photo}>
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="product-info-container">
        <ProductInfo />
      </div>
    </div>
  );
}

export default MidScreenGallery;
