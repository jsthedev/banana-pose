import { useContext } from "react";

import "@/components/product_details/product_gallery/product_gallery_screen_sizes/mid_screen_gallery/index.scss";
import { ProductsContext } from "@/contexts/productsContext";
import { ProductVariantIdsContext } from "@/contexts/productVariantIdsContext";

// at 1139px, carousel-nav should disappear
function MidScreenGallery({ onImageClick }) {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);

  // Variables
  const variant = products[productId].variants[variantId];
  const images = variant.images;

  return (
    <div className="mid-screen-gallery">
      <div className="carousel-main">
        {images.map((photo, index) => (
          <div
            className="carousel-cell"
            key={index}
            id={photo}
            onClick={() => {
              onImageClick(index);
            }}
          >
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MidScreenGallery;
