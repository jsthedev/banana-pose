// Size ordering
const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const isNumeric = (val) => !isNaN(Number(val));

// 1. Extract all sizes
const getAllSizes = (dimensionObj) => {
  const sizeSet = new Set();
  Object.values(dimensionObj).forEach((measurement) =>
    Object.keys(measurement).forEach((size) => sizeSet.add(size))
  );
  return Array.from(sizeSet);
};

// 2. Sort sizes
const sortSizes = (sizes) => {
  if (sizes.every(isNumeric)) {
    return sizes
      .map(Number)
      .sort((a, b) => a - b)
      .map(String);
  } else {
    return sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
  }
};

// 3. Build table
export const sizeDimensionData = (dimensionObj) => {
  const rawSizes = getAllSizes(dimensionObj);
  const sortedSizes = sortSizes(rawSizes);

  const rows = Object.entries(dimensionObj).map(([measurement, values]) => {
    return {
      measurement,
      values: sortedSizes.map((size) => values[size] || "-"),
    };
  });

  return { sortedSizes, rows };
};
