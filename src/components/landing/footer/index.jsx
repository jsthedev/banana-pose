import { externalLinks } from "@/utils/external_links";

import FooterLink from "@/components/landing/footer/footer_link/index.jsx";
import SNSIcon from "@/components/landing/footer/SNS_icon/index.jsx";

import InstagramIcon from "@/assets/images/icons/icons8-instagram-120.png";
import TiktokIcon from "@/assets/images/icons/icons8-tiktok-120.png";
import YoutubeIcon from "@/assets/images/icons/icons8-youtube-150.png";

import "@/components/landing/footer/index.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-contents-wrapper">
        <div className="footer-contents">
          <div className="footer-text-left">© Banana Pose 2024</div>
          <div className="footer-contents-right">
            <div className="footer-links">
              <FooterLink link="/legal/privacy-policy" text="PRIVACY" />
              <FooterLink link="/legal/shipping-policy" text="SHIPPING" />
              <FooterLink link="/legal/return-policy" text="RETURN" />
              <FooterLink
                link="/legal/terms-and-conditions"
                text="TERMS & CONDITIONS"
              />
            </div>
            <div className="footer-icons">
              <SNSIcon link={externalLinks.instagram} icon={InstagramIcon} />
              <SNSIcon link={externalLinks.tiktok} icon={TiktokIcon} />{" "}
              <SNSIcon link={externalLinks.youtube} icon={YoutubeIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
