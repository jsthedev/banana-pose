import { Outlet } from 'react-router-dom';

import CheckoutNavBar from '@/components/header/checkout_nav_bar';
import ScrollTop from '@/components/scroll_top';
import Footer from '@/components/footer';

function CheckoutLanding() {
  return (
    <div>
      <header>
        <CheckoutNavBar />
      </header>
      <main>
        <ScrollTop />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CheckoutLanding;
