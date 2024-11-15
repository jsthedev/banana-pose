import Landing from '@/pages/index.jsx';
import Products from '@/pages/products/index.jsx';
import ProductDetails from '@/pages/product_details/index.jsx';
import SmallScreenGallery from './components/product_gallery/product_gallery_screen_sizes/small_screen_gallery';
import MidScreenGallery from './components/product_gallery/product_gallery_screen_sizes/mid_screen_gallery';

function App() {
  return (
    <>
      <div className="app">
        <ProductDetails />
      </div>
    </>
  );
}

export default App;
