import NavBar from '@/components/landing/header/nav_bar/index.jsx';
import ScrollTop from '@/components/landing/scroll_top/index.jsx';
import PageOutlet from '@/components/landing/page_outlet';
import Footer from '@/components/landing/footer/index.jsx';

function Landing() {
  return (
    <div>
      <header>
        <NavBar />
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

export default Landing;
