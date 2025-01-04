import { Outlet } from 'react-router-dom';

import '@/components/landing/page_outlet/index.scss';

function PageOutlet() {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
}

export default PageOutlet;
