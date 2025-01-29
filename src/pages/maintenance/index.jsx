import '@/pages/maintenance/index.scss';

import LogoImage from '@/assets/images/logo/seal_logo.png';

function Maintenance() {
  return (
    <div className="maintenance">
      <div className="maintenance-contents">
        <div className="logo-image-wrapper">
          <img src={LogoImage} />
        </div>
        <div className="text">
          <h3>We'll Be Back Soon!</h3>
          <p>We're currently performing scheduled maintenance.</p>
          <p>
            We apologize for any inconvenience this may cause and appreciate
            your understanding.
          </p>
          <p>
            If you have any urgent concerns, please contact us at{' '}
            <a href="mailto:info@bananapose.com">info@bananapose.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
