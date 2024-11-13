import WideScreenGallery from './product_gallery_screen_sizes/wide_screen_gallery';
import MidScreenGallery from './product_gallery_screen_sizes/mid_screen_gallery';
import SmallScreenGallery from './product_gallery_screen_sizes/small_screen_gallery';

import '@/pages/products/product_details/product_gallery/index.scss';

// TODO: Make ProductGallery Responsive
// at 1139px, carousel-nav should disappear
// at 1007px, carousel-main becomes normal horizontal carousel
// at 1007px, the flex-direction changes to column

function ProductGallery({ product }) {
  return (
    <div className="product-gallery">
      <WideScreenGallery product={product} />
    </div>
  );
}

export default ProductGallery;
