import { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

import ProductInfo from '@/pages/products/product_details/product_gallery/product_info/index.jsx';

import '@/pages/products/product_details/product_gallery/product_gallery_screen_sizes/small_screen_gallery/index.scss';

// at 1007px, carousel-main becomes normal horizontal carousel
// at 1007px, the flex-direction changes to column
function SmallScreenGallery({ product }) {
  const images = product.images;

  // Flickity Refs
  const mainCarouselRef = useRef(null);

  useEffect(() => {
    // Flickity Initialization
    const mainFlkty = new Flickity(mainCarouselRef.current, {
      prevNextButtons: false,
      pageDots: true,
      adaptiveHeight: true,
      // watchCSS: false,
      dragThreshold: 8,
      initialIndex: 0,
      draggable: true,
    });

    // Unmount Cleanup
    return () => {
      mainFlkty.destroy();
    };
  }, []);

  return (
    <div className="small-screen-gallery">
      <div className="carousel-main" ref={mainCarouselRef}>
        {images.map((photo, index) => (
          <div className="carousel-cell" key={index} id={photo}>
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="product-info-container">
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

export default SmallScreenGallery;
