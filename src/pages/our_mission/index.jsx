import '@/pages/our_mission/index.scss';

import Placeholder from '@/assets/images/our_mission/35242676104_61abae6693_o.jpg';

function OurMission() {
  return (
    <div className="our-mission page">
      <div className="full-screen-title">
        <div className="wide-image-wrapper">
          <img src={Placeholder} />
        </div>
        <div className="our-mission-title">Our Mission</div>
      </div>
    </div>
  );
}

export default OurMission;
