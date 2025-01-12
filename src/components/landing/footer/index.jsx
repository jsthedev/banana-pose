import SNSIcon from '@/components/landing/footer/SNS_icon/index.jsx';

import InstagramIcon from '@/assets/images/icons/icons8-instagram-120.png';
import TiktokIcon from '@/assets/images/icons/icons8-tiktok-120.png';
import YoutubeIcon from '@/assets/images/icons/icons8-youtube-150.png';

import '@/components/landing/footer/index.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-contents-wrapper">
        <div className="footer-contents">
          <div className="footer-text-left">© Banana Pose 2024</div>
          <div className="footer-contents-right">
            <div className="footer-icons">
              <SNSIcon
                link={'https://www.instagram.com/banana.pose'}
                icon={InstagramIcon}
              />
              <SNSIcon
                link={'https://www.tiktok.com/@bananapose'}
                icon={TiktokIcon}
              />{' '}
              <SNSIcon
                link={'https://www.youtube.com/@bananapose'}
                icon={YoutubeIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
