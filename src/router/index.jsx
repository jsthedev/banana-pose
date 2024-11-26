import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from '@/pages/index.jsx';
import Home from '@/pages/home/index.jsx';
import Products from '@/pages/products/index.jsx';
import ProductDetails from '@/pages/product_details/index.jsx';
import OurMission from '@/pages/our_mission';
import ShoppingBag from '@/pages/shopping_bag';
import NotFound from '@/pages/not_found/index.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/shoppingbag" element={<ShoppingBag />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
