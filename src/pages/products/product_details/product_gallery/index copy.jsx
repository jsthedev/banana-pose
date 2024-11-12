import { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity-as-nav-for';
import 'flickity/css/flickity.css';

import 'src/pages/products/product_details/product_gallery/index.scss';

import products from '@/data/products.json';

// function ProductGallery({ gallery }) {
function ProductGallery() {
  // Static data for testing
  const productId = 't-shirt-01';
  const product = products.find((prod) => prod.id === productId);
  const gallery = product.gallery;

  // Flickity Configs
  const mainCarouselRef = useRef(null);
  const navCarouselRef = useRef(null);
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);

  useEffect(() => {
    const mainFlkty = new Flickity(mainCarouselRef.current, {
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: true,
      watchCSS: true,
      dragThreshold: 8,
      initialIndex: 0,
      draggable: true,
    });

    // mainFlkty.on('select', () => {
    //   setSelectedNavIndex(mainFlkty.selectedIndex);
    // });

    const navFlkty = new Flickity(navCarouselRef.current, {
      asNavFor: '.carousel-main',
      contain: true,
      pageDots: false,
      watchCSS: true,
    });

    return () => {
      mainFlkty.destroy();
      navFlkty.destroy();
    };
  }, []);

  // Function
  // const handledNavClick = (index) => {
  //   setSelectedNavIndex(index);
  //   const mainFlkty = Flickity.data(mainCarouselRef.current);
  //   mainFlkty.select(index);
  // };

  return (
    <div className="product-gallery">
      <div className="carousel-nav-wrapper">
        <div className="carousel-nav" ref={navCarouselRef}>
          {gallery.map((photo, index) => (
            <div
              className="carousel-cell-wrapper"
              // className={`carousel-cell-wrapper ${selectedNavIndex === index ? 'selected-nav' : ''}`}
              // onClick={() => handledNavClick(index)}
              key={index}
            >
              <a className="carousel-cell" href={`#${photo}`}>
                <img src={photo} alt={`Thumbnail ${index + 1}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-main-wrapper">
        <div className="carousel-main" ref={mainCarouselRef}>
          {gallery.map((photo, index) => (
            <div className="carousel-cell" key={index} id={photo}>
              <img src={photo} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
