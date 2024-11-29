import { Outlet } from 'react-router-dom';

import NavBar from '@/components/header/nav_bar';
import ScrollTop from '@/components/scroll_top';
import Footer from '@/components/footer';

import '@/pages/index.scss';

function Landing() {
  return (
    <div>
      <header>
        <NavBar />
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

export default Landing;
