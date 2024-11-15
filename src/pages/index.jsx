import { Outlet } from 'react-router-dom';

import NavBar from '@/components/header/nav_bar';

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
    </div>
  );
}

export default Landing;
