// Formatting price function
export const formatPrice = (unitAmount, currency) => {
  const currencyCapital = currency.toUpperCase();
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCapital,
  });

  const { minimumFractionDigits } = formatter.resolvedOptions();
  const divisor = Math.pow(10, minimumFractionDigits);

  return formatter.format(unitAmount / divisor);
};
