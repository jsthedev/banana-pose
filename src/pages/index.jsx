// Landing Page
import '@/pages/index.scss';
import '@/assets/styles/common-styles.scss';
import LandingPageImage from '@/assets/images/BANFF-1.jpg';

function Landing() {
  return (
    <div className="landing page">
      <div className="landing-img-wrapper">
        <img className="landing-img" src={LandingPageImage} />
      </div>
    </div>
  );
}

export default Landing;
