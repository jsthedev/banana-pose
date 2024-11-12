import { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';

import ProductInfo from '@/pages/products/product_details/product_gallery/product_info/index.jsx';

import '@/pages/products/product_details/product_gallery/index.scss';

function ProductGallery({ product }) {
  const images = product.images;

  // Flickity Refs
  const mainCarouselRef = useRef(null);
  const navCarouselRef = useRef(null);

  // Scroll Event Handler Refs
  const currentImageRefs = useRef([]);

  // Scroll Event Handler State
  const [selectedIndex, setSelectedIndex] = useState(0);

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

    const navFlkty = new Flickity(navCarouselRef.current, {
      contain: true,
      pageDots: false,
      watchCSS: true,
    });

    // Scroll Event Handler

    const handleScroll = () => {
      let foundIndex = -1;

      currentImageRefs.current.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom >= 0) {
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
      mainFlkty.destroy();
      navFlkty.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedIndex]);

  // Scrolling By Navigation Carousel Function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(
        `element ID ${sectionId} is invalid. Check src/data/products.json.`
      );
    }
  };

  return (
    <div className="product-gallery">
      <div className="carousel-nav" ref={navCarouselRef}>
        {images.map((photo, index) => (
          <div
            className={`carousel-cell ${selectedIndex === index ? 'is-selected' : ''}`}
            key={index}
            onClick={() => scrollToSection(photo)}
          >
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-main" ref={mainCarouselRef}>
        {images.map((photo, index) => (
          <div
            className="carousel-cell"
            key={index}
            id={photo}
            ref={(currentImage) =>
              (currentImageRefs.current[index] = currentImage)
            }
          >
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

export default ProductGallery;
