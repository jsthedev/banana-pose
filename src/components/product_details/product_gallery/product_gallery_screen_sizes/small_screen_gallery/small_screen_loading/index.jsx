import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import ProductInfoLoading from '@/components/product_details/product_info/product_info_loading';
import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/product_details/product_gallery/product_gallery_screen_sizes/small_screen_gallery/small_screen_loading/index.scss';

function SmallScreenLoading() {
  // Variables
  const images = ['image1', 'image2', 'image3', 'image4'];

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
          <SwiperSlide className="carousel-cell" key={index}>
            <SkeletonImageLoader />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-info-container">
        <ProductInfoLoading />
      </div>
    </div>
  );
}

export default SmallScreenLoading;
