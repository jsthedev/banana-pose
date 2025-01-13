import { Link } from 'react-router-dom';

import '@/components/landing/footer/footer_link/index.scss';

function FooterLink({ link, text }) {
  return (
    <div className="footer-link-wrapper ">
      <Link className="footer-link normal-link" to={link}>
        {text}
      </Link>
    </div>
  );
}

export default FooterLink;
