import { Link } from 'react-router-dom';

import 'src/components/header/nav_bar/index.scss';

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo-wrapper">
        <Link to={'/home'} className="nav-bar-home-link">
          <div className="banana-pose">Banana Pose</div>
        </Link>
      </div>
      <div className="menu">
        <Link className="nav-bar-products-link" to="/products">
          READY TO WEAR
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
