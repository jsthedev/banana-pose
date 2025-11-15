import { Helmet } from "react-helmet-async";
import { MissionSEO } from "@/components/seo/our_mission";

import "@/pages/our_mission/index.scss";

import LogoImage from "@/assets/images/logo/seal_logo.png";
import QualityImage from "@/assets/images/our_mission/quality.jpg";
import ComfortImage from "@/assets/images/our_mission/comfort.jpg";
import SustainabilityImage from "@/assets/images/our_mission/Cotton_field_kv17.jpg";

function OurMission() {
  return (
    <div className="our-mission">
      <Helmet>{MissionSEO}</Helmet>
      <div className="our-mission-main-text">
        <div className="logo-image-wrapper">
          <img src={LogoImage} />
        </div>
        <h3>
          Seals only perform the banana pose when they feel safe and content.
        </h3>
        <p>
          We draw inspiration from this serene behavior to create clothing that
          brings you the same sense of comfort and contentedness. <br />
          <br />
          Our mission is to craft apparel that provides comforting and contented
          experiences.
        </p>
      </div>
      <div className="photo-text-boxes">
        <div className="photo-text-box">
          <div className="img-wrapper">
            <img src={QualityImage} />
          </div>
          <div className="text-box">
            <h2>Quality</h2>
            <p>
              We take pride in making high-quality garments locally in North
              America. Every piece in our collection is thoughtfully designed
              and crafted to ensure it lasts. We respect our customers, our
              craft, our community, and the environment by delivering clothes
              that stand the test of time.
            </p>
          </div>
        </div>
        <div className="text-photo-box">
          <div className="text-box">
            <h2>Sustainability</h2>
            <p>
              Sustainability is at the heart of everything we do. Every decision
              we make—from manufacturing to operations—is guided by our
              commitment to environmental responsibility. We are dedicated to
              minimizing our impact on the planet and promoting sustainable
              practices within the fashion industry.
            </p>
          </div>
          <div className="img-wrapper">
            <img src={SustainabilityImage} />
          </div>
        </div>
        <div className="photo-text-box">
          <div className="img-wrapper">
            <img src={ComfortImage} />
          </div>
          <div className="text-box">
            <h2>Comfort</h2>
            <p>
              Comfort is the foundation of everything we create. We believe that
              the true essence of great clothing lies in how it feels, both
              physically and mentally. Our goal is to create garments as tools
              to add a little more comfort in your everyday life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
