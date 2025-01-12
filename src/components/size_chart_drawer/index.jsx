import { useContext, useState, useImperativeHandle, forwardRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import TshirtsSizeChartTable from '@/components/size_chart_drawer/size_chart_tables/t-shirts/index.jsx';
import JeansSizeChartTable from '@/components/size_chart_drawer/size_chart_tables/jeans/index.jsx';

import { ProductsContext } from '@/contexts/productsContext';
import { ProductVariantIdsContext } from '@/contexts/productVariantIdsContext';

import '@/components/size_chart_drawer/index.scss';

function SizeChartDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId } = useContext(ProductVariantIdsContext);

  // Variable
  const type = products[productId].type;
  const typeCapital = type.charAt(0).toUpperCase() + type.slice(1);

  // Functions
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isDrawerOpen && (
        <div
          className={`size-chart-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
          onClick={closeDrawer}
        ></div>
      )}
      <div className={`size-chart-drawer ${isDrawerOpen ? 'open' : ''}`}>
        {/* Position fixed in case of adding contents to be scrolled later on */}
        <div className={`close-button-wrapper ${isDrawerOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={() => closeDrawer()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="drawer-content-wrapper">
          <div className="size-chart-wrapper">
            <div className="size-chart-name">Ready to wear</div>
            <div className="size-chart-name">{typeCapital}</div>
            <div className="size-chart-table-wrapper">
              {type === 't-shirt' && <TshirtsSizeChartTable />}
              {type === 'jeans' && <JeansSizeChartTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SizeChartDrawer;
