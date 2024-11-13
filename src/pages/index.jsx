import "@/pages/index.scss";

import { Outlet } from "react-router-dom";
import NavBar from "@/components/nav-bar";

function LandingPageWrapper() {
  return (
    <div className="landing-wrapper">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LandingPageWrapper;
