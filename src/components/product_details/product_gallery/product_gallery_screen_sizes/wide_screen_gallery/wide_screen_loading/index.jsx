import { useEffect, useRef, useState } from 'react';

import ProductInfoLoading from '@/components/product_details/product_info/product_info_loading';
import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/product_details/product_gallery/product_gallery_screen_sizes/wide_screen_gallery/wide_screen_loading/index.scss';

function WideScreenLoading() {
  // Variables
  const images = ['image1', 'image2', 'image3', 'image4'];

  // Nav Bar Height in px
  const navBarHeight = 56;

  // Scroll Event Handler Refs
  const currentImageRefs = useRef([]);

  // Scroll Event Handler State
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Scroll Event Handler
    const handleScroll = () => {
      let foundIndex = -1;

      currentImageRefs.current.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          if (rect.top <= navBarHeight && rect.bottom >= navBarHeight) {
            foundIndex = index;
          }
        }
      });

      if (foundIndex !== -1 && foundIndex != selectedIndex) {
        setSelectedIndex(foundIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Unmount Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedIndex]);

  // Scrolling By Navigation Carousel Function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navBarHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      console.warn(
        `element ID ${sectionId} is invalid. Check src/data/products.json.`
      );
    }
  };

  return (
    <div className="wide-screen-gallery">
      <div className="carousel-nav">
        {images.map((photo, index) => (
          <div
            className={`carousel-cell ${selectedIndex === index ? 'is-selected' : ''}`}
            key={index}
            onClick={() => scrollToSection(photo)}
          >
            <SkeletonImageLoader />
          </div>
        ))}
      </div>
      <div className="carousel-main">
        {images.map((photo, index) => (
          <div
            className="carousel-cell"
            key={index}
            id={photo}
            ref={(currentImage) =>
              (currentImageRefs.current[index] = currentImage)
            }
          >
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

export default WideScreenLoading;
