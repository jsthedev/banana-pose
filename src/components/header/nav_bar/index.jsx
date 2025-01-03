import { useEffect, useState } from 'react';

import DesktopNavBar from '@/components/header/nav_bar/desktop_nav_bar';
import MobileNavBar from '@/components/header/nav_bar/mobile_nav_bar';

import '@/components/header/nav_bar/index.scss';

function NavBar() {
  const DESKTOP_DIMENSION = 1280;

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= DESKTOP_DIMENSION
  );

  const calculateIsDesktop = () => {
    setIsDesktop(window.innerWidth >= DESKTOP_DIMENSION);
  };

  useEffect(() => {
    window.addEventListener('resize', calculateIsDesktop);

    return () => {
      window.removeEventListener('resize', calculateIsDesktop);
    };
  }, []);

  return (
    <div className="nav-bar">
      {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
    </div>
  );
}

export default NavBar;
