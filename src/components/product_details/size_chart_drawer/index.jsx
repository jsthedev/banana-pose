import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import TshirtsSizeChartTable from "@/components/product_details/size_chart_drawer/size_chart_tables/t-shirts/index.jsx";
import JeansSizeChartTable from "@/components/product_details/size_chart_drawer/size_chart_tables/jeans/index.jsx";

import DimensionChartTable from "@/components/product_details/size_chart_drawer/size_chart_tables/dimension/index.jsx";

import { ProductsContext } from "@/contexts/productsContext";
import { ProductVariantIdsContext } from "@/contexts/productVariantIdsContext";

import "@/components/product_details/size_chart_drawer/index.scss";

function SizeChartDrawer({ text = "Size Guide" }) {
  // Contexts
  const { products } = useContext(ProductsContext);
  const { productId } = useContext(ProductVariantIdsContext);

  // State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openSizeChartDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Variable
  const type = products[productId].type;
  const typeCapital = type.charAt(0).toUpperCase() + type.slice(1);

  const dimension = products[productId].dimension;

  console.log(products);

  // Functions
  const closeSizeChartDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div
        className="size-chart-click normal-link"
        onClick={openSizeChartDrawer}
      >
        {text}
      </div>
      {isDrawerOpen && (
        <div
          className={`size-chart-drawer-overlay ${isDrawerOpen ? "open" : ""}`}
          onClick={closeSizeChartDrawer}
        ></div>
      )}
      <div className={`size-chart-drawer ${isDrawerOpen ? "open" : ""}`}>
        {/* Position fixed in case of adding contents to be scrolled later on */}
        <div className={`close-button-wrapper ${isDrawerOpen ? "open" : ""}`}>
          <button
            className="close-button"
            onClick={() => closeSizeChartDrawer()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="drawer-content-wrapper">
          <div className="size-chart-wrapper">
            <div className="size-chart-name">Ready to wear</div>
            <div className="size-chart-name">{typeCapital}</div>
            <div className="size-chart-table-wrapper">
              {type === "t-shirt" && <TshirtsSizeChartTable />}
              {type === "jeans" && <JeansSizeChartTable />}
            </div>
          </div>
          <div className="dimension-chart-wrapper">
            <div className="dimension-chart-name">Dimensions (inches)</div>
            <div className="dimension-chart-table-wrapper">
              <DimensionChartTable dimensionChart={dimension} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SizeChartDrawer;
