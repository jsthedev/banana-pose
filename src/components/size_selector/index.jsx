import '@/components/size_selector/index.scss';

function SizeSelector({ sizes, selectedSize, onSizeSelect }) {
  // Define size order for letter sizes
  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const sortedSizes = [...sizes].sort((a, b) => {
    const isANumeric = !isNaN(a);
    const isBNumeric = !isNaN(b);

    if (!isANumeric && !isBNumeric) {
      return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
    }

    if (isANumeric && isBNumeric) {
      return parseInt(a) - parseInt(b);
    }

    // Mixed types: Letters come before numbers
    return isANumeric ? 1 : -1;
  });

  const handledSizeClick = (size) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  return (
    <div className="size-select-buttons-wrapper">
      <div className="size-select-buttons">
        {sortedSizes.map((size) => (
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
