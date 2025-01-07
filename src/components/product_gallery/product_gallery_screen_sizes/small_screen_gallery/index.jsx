import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import ProductInfo from '@/components/product_info/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';

import '@/components/product_gallery/product_gallery_screen_sizes/small_screen_gallery/index.scss';

function SmallScreenGallery() {
  const { products } = useContext(ProductsContext);
  const { productId, variantId } = useContext(ProductVariantIdsContext);

  const variant = products[productId].variants[variantId];
  const images = variant.images;

  const pagination = {
    clickable: true,
  };

  return (
    <div className="small-screen-gallery">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="carousel-main"
        height={0}
      >
        {images.map((photo, index) => (
          <SwiperSlide className="carousel-cell" key={index}>
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-info-container">
        <ProductInfo />
      </div>
    </div>
  );
}

export default SmallScreenGallery;
