import '@/pages/our_mission/index.scss';

import Placeholder from '@/assets/images/our_mission/35242676104_61abae6693_o.jpg';
import LogoImage from '@/assets/images/logo/seal_logo.png';

function OurMission() {
  return (
    <div className="our-mission page">
      <div className="full-screen-title">
        <div className="wide-image-wrapper">
          <img src={Placeholder} />
        </div>
        <div className="our-mission-title">Our Mission</div>
        <div className="full-screen-title-spacer" />
      </div>
      <div className="our-mission-main-text">
        <div className="logo-image-wrapper">
          <img src={LogoImage} />
        </div>
        <h3>
          Seals only perform the banana pose when they feel safe and content.
        </h3>
        <p>
          We draw inspiration from this serene behavior to create clothing that
          brings you the same sense of comfort and contentedness. <br />
          <br />
          Our mission is to craft apparel that provides comforting and contented
          experiences.
        </p>
      </div>
      <div className="photo-text-boxes"></div>
    </div>
  );
}

export default OurMission;
