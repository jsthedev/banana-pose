import '@/pages/home/index.scss';
import HomePageImage from '@/assets/images/BANFF-1.jpg';

function Home() {
  return (
    <div className="home page">
      <div className="home-landing-container">
        <div className="text">Drop #1 2025.01.01</div>
        <div className="wide-image-wrapper">
          <img className="home-imgage" src={HomePageImage} />
        </div>
        <div className="wide-image-wrapper">
          <img className="home-imgage" src={HomePageImage} />
        </div>
        <div className="wide-image-wrapper">
          <img className="home-imgage" src={HomePageImage} />
        </div>
      </div>
    </div>
  );
}

export default Home;
