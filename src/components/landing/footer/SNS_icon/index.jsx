import '@/components/landing/footer/SNS_icon/index.scss';

function SNSIcon({ link, icon }) {
  return (
    <div className="SNS-icon">
      <a
        href={link}
        className="icon-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={icon} className="icon-img" />
      </a>
    </div>
  );
}

export default SNSIcon;
