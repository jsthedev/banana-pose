import { useState, useImperativeHandle, forwardRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faT, faTimes } from '@fortawesome/free-solid-svg-icons';

import SizeChartTable from '@/pages/products/product_details/size_chart_drawer/size_chart_table/index.jsx';

import '@/pages/products/product_details/size_chart_drawer/index.scss';

function SizeChartDrawer() {
  // // States
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // // Functions
  // const handleOverlayClick = () => {
  //   setIsOpen(false);
  // };

  // // Expose open and close methods to the parent
  // useImperativeHandle(ref, () => ({
  //   open: () => setIsDrawerOpen(true),
  //   close: () => setIsDrawerOpen(false),
  // }));

  return (
    <div className="size-chart-drawer-container">
      <div className="size-chart-drawer">
        <div className="close-button-wrapper">
          <button
            className="close-button"
            onClick={() => setIsDrawerOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="drawer-content-wrapper">
          <div className="size-chart-wrapper">
            <div className="size-chart-name">Ready to wear</div>
            <div className="size-chart-table-wrapper">
              <SizeChartTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeChartDrawer;
