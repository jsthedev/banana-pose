import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from '@/pages/landing/default/index.jsx';
import Home from '@/pages/home/index.jsx';
import Products from '@/pages/products/index.jsx';
import ProductDetails from '@/pages/product_details/index.jsx';
import OurMission from '@/pages/our_mission';
import ShoppingBag from '@/pages/shopping_bag';
import ContactUs from '@/pages/contact_us';
import CheckoutLanding from '@/pages/landing/checkout_landing';
import CheckoutForm from '@/pages/checkout/checkout_form/index.jsx';
import Return from '@/pages/checkout/return/index.jsx';
import NotFound from '@/pages/not_found/index.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productVariant" element={<ProductDetails />} />
        <Route path="our-mission" element={<OurMission />} />
        <Route path="shopping-bag" element={<ShoppingBag />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="return" element={<Return />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="checkout" element={<CheckoutLanding />}>
        <Route index element={<CheckoutForm />} />
      </Route>
    </Routes>
  );
}

export default Router;
