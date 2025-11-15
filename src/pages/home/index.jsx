import { Helmet } from "react-helmet-async";
import { HomeSEO } from "@/components/seo/home";
import { images } from "@/vars/images";

import "@/pages/home/index.scss";

function Home() {
  return (
    <div className="home">
      <Helmet>{HomeSEO}</Helmet>
      <div className="home-landing-container">
        <div className="wide-image-wrapper">
          <img className="home-image" src={images.home} />
        </div>
      </div>
    </div>
  );
}

export default Home;
