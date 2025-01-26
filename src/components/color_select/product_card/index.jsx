import { colorMap } from '@/constants/colorMap';

import '@/components/color_select/product_card/index.scss';

function ProductCardColorSelect({ selectedColor, colors, onColorSelect }) {
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
