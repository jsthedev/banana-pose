import ProductInfo from '@/components/product_info/index.jsx';

import '@/components/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/index.scss';

// at 1139px, carousel-nav should disappear
function MidScreenGallery({ product }) {
  const images = product.images;

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
        <ProductInfo product={product} />
      </div>
    </div>
  );
}

export default MidScreenGallery;
