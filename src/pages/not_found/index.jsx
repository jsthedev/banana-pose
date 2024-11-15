import { Link } from 'react-router-dom';

import '@/pages/not_found/index.scss';

function NotFound() {
  return (
    <div className="not-found page">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="not-found-home" to="/home">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
