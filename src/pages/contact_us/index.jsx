import '@/pages/contact_us/index.scss';

function ContactUs() {
  return (
    <div className="contact-us page">
      <div className="page-contents">
        <div className="page-name">Contact Us</div>
        <div className="contact-list">
          <div className="email contact-list-item">
            <h3>Email</h3>
            <p>info@bananapose.com</p>
          </div>
          <div className="address contact-list-item">
            <h3>Address</h3>
            <p>
              Suite 314 <br />
              818 The Queensway <br />
              Toronto ON M8Z 1N5 <br />
              Canada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
