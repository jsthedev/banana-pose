import { useState } from "react";

import colorsData from "@/data/colors.json";

import "@/components/color_select/product_card/index.scss";

function ProductCardColorSelect({ selectedColor, colors, onColorSelect }) {
  const colorMap = colorsData;

  // Function
  const handledColorClick = (color) => {
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <div className="color-select">
      {colors.map((color) => (
        <div
          className={`color-card-wrapper ${selectedColor === color ? "selected" : ""}`}
          key={color}
        >
          {/* {typeof colorMap[selectedColor]} */}
          <div
            className="color-card"
            onClick={() => handledColorClick(color)}
            style={{ backgroundColor: colorMap[color] }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductCardColorSelect;
