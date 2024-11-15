import { useState, useEffect } from 'react';

import WideScreenGallery from './product_gallery_screen_sizes/wide_screen_gallery';
import MidScreenGallery from './product_gallery_screen_sizes/mid_screen_gallery';
import SmallScreenGallery from './product_gallery_screen_sizes/small_screen_gallery';

import '@/components/product_gallery/index.scss';

// at 1139px, carousel-nav should disappear
// at 1007px, carousel-main becomes normal horizontal carousel
// at 1007px, the flex-direction changes to column
function ProductGallery({ product }) {
  // Functions
  const getScreenType = () => {
    const width = window.innerWidth;
    if (width <= 1007) {
      return 'small';
    } else if (width > 1007 && width <= 1139) {
      return 'mid';
    } else {
      return 'wide';
    }
  };

  // States
  const [screenType, setScreenType] = useState(getScreenType());

  /*
    Whenever component mounts, listen for resize event,
    and determine its dimension
  */
  useEffect(() => {
    function handleResize() {
      setScreenType(getScreenType());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="product-gallery">
      {screenType === 'wide' && <WideScreenGallery product={product} />}
      {screenType === 'mid' && <MidScreenGallery product={product} />}
      {screenType === 'small' && <SmallScreenGallery product={product} />}
    </div>
  );
}

export default ProductGallery;
