import { useState, useEffect } from 'react';

import WideScreenLoading from '@/components/product_details/product_gallery/product_gallery_screen_sizes/wide_screen_gallery/wide_screen_loading/index.jsx';
import MidScreenLoading from '@/components/product_details/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/mid_screen_loading/index.jsx';
import SmallScreenLoading from '@/components/product_details/product_gallery/product_gallery_screen_sizes/small_screen_gallery/small_screen_loading/index.jsx';

import '@/components/product_details/product_gallery/product_gallery_loading/index.scss';

// at 1139px, carousel-nav should disappear
// at 1007px, carousel-main becomes normal horizontal carousel
// at 1007px, the flex-direction changes to column
function ProductGalleryLoading() {
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
      {screenType === 'wide' && <WideScreenLoading />}
      {screenType === 'mid' && <MidScreenLoading />}
      {screenType === 'small' && <SmallScreenLoading />}
    </div>
  );
}

export default ProductGalleryLoading;
