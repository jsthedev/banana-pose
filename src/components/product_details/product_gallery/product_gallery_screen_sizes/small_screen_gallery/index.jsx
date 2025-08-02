import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { ProductsContext } from "@/contexts/productsContext";
import { ProductVariantIdsContext } from "@/contexts/productVariantIdsContext";

import "@/components/product_details/product_gallery/product_gallery_screen_sizes/small_screen_gallery/index.scss";

function SmallScreenGallery({ onImageClick }) {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);

  // Variables
  const variant = products[productId].variants[variantId];
  const images = variant.images;

  return (
    <div className="small-screen-gallery">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="carousel-main"
        height={0}
      >
        {images.map((photo, index) => (
          <SwiperSlide
            className="carousel-cell"
            key={index}
            onClick={() => {
              onImageClick(index);
            }}
          >
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SmallScreenGallery;
