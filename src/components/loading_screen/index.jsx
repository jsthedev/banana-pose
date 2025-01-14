import '@/components/loading_screen/index.scss';

import logoImage from '@/assets/images/logo/seal_logo.png';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img className="logo-image" src={logoImage} />
      <p className="logo-text">Banana Pose</p>
    </div>
  );
};

export default LoadingScreen;
