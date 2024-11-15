import '@/pages/home/index.scss';
import HomePageImage from '@/assets/images/BANFF-1.jpg';

function Home() {
  return (
    <div className="home page">
      <div className="home-img-wrapper">
        <img className="home-img" src={HomePageImage} />
      </div>
      <div className="text">BP First Drop - 2025.01.01</div>
    </div>
  );
}

export default Home;
