import { useEffect, useRef } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

import ProductInfo from '@/pages/products/product_details/product_gallery/product_info/index.jsx';

import '@/pages/products/product_details/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/index.scss';

// at 1139px, carousel-nav should disappear
function MidScreenGallery({ product }) {
  const images = product.images;

  // Flickity Refs
  const mainCarouselRef = useRef(null);

  useEffect(() => {
    // Flickity Initialization
    const mainFlkty = new Flickity(mainCarouselRef.current, {
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: true,
      watchCSS: true,
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
    <div className="mid-screen-gallery">
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

export default MidScreenGallery;
