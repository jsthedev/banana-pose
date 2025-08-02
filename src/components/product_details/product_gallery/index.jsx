import { useContext, useState, useEffect, useCallback } from "react";

import { ProductsContext } from "@/contexts/productsContext";
import { ProductVariantIdsContext } from "@/contexts/productVariantIdsContext";

import WideScreenGallery from "./product_gallery_screen_sizes/wide_screen_gallery";
import MidScreenGallery from "./product_gallery_screen_sizes/mid_screen_gallery";
import SmallScreenGallery from "./product_gallery_screen_sizes/small_screen_gallery";

import ImageViewer from "@/components/product_details/image_viewer/index.jsx";

import ProductInfo from "@/components/product_details/product_info/index.jsx";

import "@/components/product_details/product_gallery/index.scss";

// at 1139px, carousel-nav disappears
// at 1007px, carousel-main becomes normal horizontal carousel
// at 1007px, the flex-direction changes to column
function ProductGallery() {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);

  // Variables
  const variant = products[productId].variants[variantId];
  const images = variant.images;

  // Functions
  const getScreenType = () => {
    const width = window.innerWidth;
    if (width <= 1007) {
      return "small";
    } else if (width > 1007 && width <= 1139) {
      return "mid";
    } else {
      return "wide";
    }
  };

  // Screen Size States
  const [screenType, setScreenType] = useState(getScreenType());

  useEffect(() => {
    function handleResize() {
      setScreenType(getScreenType());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Image Viewer Event Handler State
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);
  const toggleImageViewer = () => {
    setImageViewerOpen(!isImageViewerOpen);
  };
  const [clickedIndex, setClickedIndex] = useState(0);

  const onImageClick = (index) => {
    setClickedIndex(index);
    toggleImageViewer();
  };

  return (
    <div className="product-gallery">
      {screenType === "wide" && (
        <WideScreenGallery onImageClick={onImageClick} />
      )}
      {screenType === "mid" && <MidScreenGallery onImageClick={onImageClick} />}
      {screenType === "small" && (
        <SmallScreenGallery onImageClick={onImageClick} />
      )}
      {isImageViewerOpen && (
        <ImageViewer
          images={images}
          clickedIndex={clickedIndex}
          onClose={toggleImageViewer}
        />
      )}
      <div className="product-info-container">
        <ProductInfo />
      </div>
    </div>
  );
}

export default ProductGallery;
