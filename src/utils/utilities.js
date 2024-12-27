// Example: {formatPrice(price.unit_amount, price.currency.toUpperCase())}

export const formatPrice = (amount, currency) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  });

  const { minimumFractionDigits } = formatter.resolvedOptions();
  const divisor = Math.pow(10, minimumFractionDigits);

  return formatter.format(amount / divisor);
};
