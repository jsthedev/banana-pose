import { useEffect, useRef, useState, useContext } from "react";

import { ProductsContext } from "@/contexts/productsContext";
import { ProductVariantIdsContext } from "@/contexts/productVariantIdsContext";

import "@/components/product_details/product_gallery/product_gallery_screen_sizes/wide_screen_gallery/index.scss";

function WideScreenGallery({ onImageClick }) {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);

  // Variables
  const variant = products[productId].variants[variantId];
  const images = variant.images;

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

    window.addEventListener("scroll", handleScroll);

    // Unmount Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedIndex]);

  // Scrolling By Navigation Carousel Function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navBarHeight;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
            className={`carousel-cell ${selectedIndex === index ? "is-selected" : ""}`}
            key={index}
            onClick={() => scrollToSection(photo)}
          >
            <img src={photo} alt={`Nav ${index + 1}`} />
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
            onClick={() => {
              onImageClick(index);
            }}
          >
            <img src={photo} alt={`Main ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WideScreenGallery;
