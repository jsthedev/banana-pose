import { useState, useImperativeHandle, forwardRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import '@/components/size_chart_drawer/index.scss';

// TODO: add size chart table for bottom

const SizeChartDrawer = forwardRef(({ children }, ref) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Functions
  const handleOverlayClick = () => {
    setIsDrawerOpen(false);
  };

  // Expose open and close methods to the parent
  useImperativeHandle(ref, () => ({
    open: () => setIsDrawerOpen(true),
    close: () => setIsDrawerOpen(false),
  }));

  return (
    <>
      {isDrawerOpen && (
        <div
          className={`size-chart-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className={`size-chart-drawer ${isDrawerOpen ? 'open' : ''}`}>
        {/* Position fixed in case of adding contents to be scrolled later on */}
        <div className={`close-button-wrapper ${isDrawerOpen ? 'open' : ''}`}>
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
            <div className="size-chart-table-wrapper">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
});

export default SizeChartDrawer;
