import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import DesktopNavBarContents from '@/components/header/nav_bar/desktop_nav_bar_contents';
import MobileNavBarContents from '@/components/header/nav_bar/mobile_nav_bar_contents';

import '@/components/header/nav_bar/index.scss';

// TODO: Make NavBar responsive
// desktop > 1279 shows extended menu
// mobile <= 1279 menu becomes hamburger icon at the right
// TODO: add shopping bag icon to both desktop and mobile nav bars
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
      <div className="logo-wrapper">
        <Link to={'/home'} className="nav-bar-home-link">
          <div className="banana-pose">Banana Pose</div>
        </Link>
      </div>
      <div className="nav-bar-contents">
        {isDesktop ? <DesktopNavBarContents /> : <MobileNavBarContents />}
      </div>
    </div>
  );
}

export default NavBar;
