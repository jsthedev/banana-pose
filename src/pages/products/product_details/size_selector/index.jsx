import { useState } from 'react';
import 'src/pages/products/product_details/size_selector/index.scss';

function SizeSelector({ sizes }) {
  // State
  const [selectedSize, setSelectedSize] = useState(null);

  // Function
  const handledSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="size-select-buttons-wrapper">
      <div className="size-select-buttons">
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => handledSizeClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelector;
