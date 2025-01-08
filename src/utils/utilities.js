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

export function validateShoppingBagItems(items, products) {
  const validItems = [];

  items.forEach((item) => {
    // If productId does not exist, skip it
    if (!item?.productId) {
      return;
    }
    const productId = item.productId;
    // If productId is not valid, skip it
    if (!(productId in products)) {
      return;
    }
    // If variantId does not exist, skip it
    if (!item?.variantId) {
      return;
    }
    const variantId = item.variantId;
    // If variantId is not valid, skip it
    if (!(variantId in products[productId].variants)) {
      return;
    }
    // If size does not exist, skip it
    if (!item?.size) {
      return;
    }
    // If size is not available, skip it
    if (!(item.size in products[productId].variants[variantId].sizes)) {
      return;
    }
    // Update validItems to include the passed item
    validItems.push(item);
  });

  return validItems;
}
