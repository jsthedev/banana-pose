import CheckoutNavBar from '@/components/landing/header/checkout_nav_bar/index.jsx';
import ScrollTop from '@/components/landing/scroll_top';
import PageOutlet from '@/components/landing/page_outlet';
import Footer from '@/components/landing/footer/index.jsx';

function CheckoutLanding() {
  return (
    <div>
      <header>
        <CheckoutNavBar />
      </header>
      <main>
        <ScrollTop />
        <PageOutlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CheckoutLanding;
