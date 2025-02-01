import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ProductsContext } from '@/contexts/productsContext';

import '@/components/landing/header/checkout_nav_bar/index.scss';

function CheckoutNavBar() {
  const { fetchProducts } = useContext(ProductsContext);
  return (
    <div className="nav-bar">
      <div className="checkout-nav-bar">
        <div className="logo-wrapper">
          <Link
            to={'/home'}
            className="nav-bar-home-link"
            onClick={fetchProducts}
          >
            Banana Pose
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutNavBar;
