import { Link } from 'react-router-dom';

import '@/components/landing/footer/footer_contents/index.scss';

import InstagramIcon from '@/assets/images/icons/icons8-instagram-120.png';
import TiktokIcon from '@/assets/images/icons/icons8-tiktok-120.png';
import YoutubeIcon from '@/assets/images/icons/icons8-youtube-150.png';

function FooterContents() {
  return (
    <div className="footer">
      <div className="footer-contents-wrapper">
        <div className="footer-contents">
          <div className="footer-text-left">© Banana Pose 2024</div>
          <div className="footer-icons-right">
            <div className="icon-wrapper">
              <a
                href="https://www.instagram.com/banana.pose/"
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={InstagramIcon} className="icon-img" />
              </a>
            </div>
            <div className="icon-wrapper">
              <a
                href="https://www.tiktok.com/@bananapose"
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={TiktokIcon} className="icon-img" />
              </a>
            </div>
            <div className="icon-wrapper">
              <a
                href="https://www.youtube.com/@bananapose"
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={YoutubeIcon} className="icon-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterContents;
