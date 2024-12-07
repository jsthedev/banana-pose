import { useState } from 'react';

import colorsData from '@/data/colors.json';

import '@/components/color_select/product_card/index.scss';

function ProductCardColorSelect({ color, colors, onColorSelect }) {
  const colorMap = colorsData[0];

  // State
  const [selectedColor, setSelectedColor] = useState(color);

  // Function
  const handledColorClick = (color) => {
    setSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <div className="color-select">
      {colors.map((color) => (
        <div
          className={`color-card-wrapper ${selectedColor === color ? 'selected' : ''}`}
          key={color}
        >
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
