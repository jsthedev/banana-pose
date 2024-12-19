import '@/components/footer/footer_bottom/index.scss';

import InstagramIcon from '@/assets/images/icons/icons8-instagram-120.png';
import TiktokIcon from '@/assets/images/icons/icons8-tiktok-120.png';
import YoutubeIcon from 'src/assets/images/icons/icons8-youtube-150.png';

function FooterBottom() {
  return (
    <div className="footer-bottom">
      <div className="footer-bottom-contents-wrapper">
        <div className="footer-bottom-contents">
          <div className="footer-bottom-text-left">© Banana Pose 2024</div>
          <div className="footer-bottom-icons-right">
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

export default FooterBottom;
