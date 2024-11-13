import { Link } from "react-router-dom";

import "@/components/nav-bar/index.scss";

function NavBar() {
  return (
    <div className="nav-bar">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/products">
        Products
      </Link>
    </div>
  );
}

export default NavBar;
