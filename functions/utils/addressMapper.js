/**
 * Maps currency codes to their respective ISO 3166-1 alpha-2 country codes.
 * Defaults to ['US'] if the currency code is not mapped.
 */

function mapCurrencyToCountries(currencyCode) {
  const currencyCountryMap = {
    USD: ['US'], // United States Dollar
    CAD: ['CA'], // Canadian Dollar
    CNY: ['CN'], // Chinese Yuan
    JPY: ['JP'], // Japanese Yen
    GBP: ['GB'], // British Pound Sterling
    KRW: ['KR'], // South Korean Won
    AUD: ['AU'], // Australian Dollar
    NZD: ['NZ'], // New Zealand Dollar
    EUR: [
      // Euro
      'AT', // Austria
      'BE', // Belgium
      'BG', // Bulgaria
      'HR', // Croatia
      'CY', // Cyprus
      'CZ', // Czech Republic
      'DK', // Denmark
      'EE', // Estonia
      'FI', // Finland
      'FR', // France
      'DE', // Germany
      'GR', // Greece
      'HU', // Hungary
      'IE', // Ireland
      'IT', // Italy
      'LV', // Latvia
      'LT', // Lithuania
      'LU', // Luxembourg
      'MT', // Malta
      'NL', // Netherlands
      'PL', // Poland
      'PT', // Portugal
      'RO', // Romania
      'SK', // Slovakia
      'SI', // Slovenia
      'ES', // Spain
      'SE', // Sweden
      // Add more EU countries as needed
    ],
    // Add more currency mappings as needed
  };

  return currencyCountryMap[currencyCode] || ['US']; // Default to ['US']
}

module.exports = { mapCurrencyToCountries };
