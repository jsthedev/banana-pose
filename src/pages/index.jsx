import { Outlet } from 'react-router-dom';

import NavBar from '@/components/header/nav_bar';
import Footer from '@/components/footer';

import '@/pages/index.scss';

function Landing() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Landing;
