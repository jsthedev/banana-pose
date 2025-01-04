import '@/pages/home/index.scss';
import HomePageImage from '@/assets/images/BANFF-1.jpg';

function Home() {
  return (
    <div className="home">
      <div className="home-landing-container">
        <div className="wide-image-wrapper">
          <img className="home-imgage" src={HomePageImage} />
        </div>
      </div>
    </div>
  );
}

export default Home;
