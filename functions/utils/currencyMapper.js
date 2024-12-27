/**
 * Maps ISO 3166-1 alpha-2 country codes to their respective currency codes.
 * Defaults to 'CAD' if the country code is not mapped.
 */

function mapCountryToCurrency(countryCode) {
  const countryCurrencyMap = {
    US: 'USD',
    CA: 'CAD',
    CN: 'CNY',
    JP: 'JPY',
    GB: 'GBP',
    KR: 'KRW',
    AU: 'AUD',
    NZ: 'NZD',
    // EU Countries
    AT: 'EUR', // Austria
    BE: 'EUR', // Belgium
    BG: 'EUR', // Bulgaria
    HR: 'EUR', // Croatia
    CY: 'EUR', // Cyprus
    CZ: 'EUR', // Czech Republic
    DK: 'EUR', // Denmark
    EE: 'EUR', // Estonia
    FI: 'EUR', // Finland
    FR: 'EUR', // France
    DE: 'EUR', // Germany
    GR: 'EUR', // Greece
    HU: 'EUR', // Hungary
    IE: 'EUR', // Ireland
    IT: 'EUR', // Italy
    LV: 'EUR', // Latvia
    LT: 'EUR', // Lithuania
    LU: 'EUR', // Luxembourg
    MT: 'EUR', // Malta
    NL: 'EUR', // Netherlands
    PL: 'EUR', // Poland
    PT: 'EUR', // Portugal
    RO: 'EUR', // Romania
    SK: 'EUR', // Slovakia
    SI: 'EUR', // Slovenia
    ES: 'EUR', // Spain
    SE: 'EUR', // Sweden
    // Add more mappings as needed
  };

  return countryCurrencyMap[countryCode] || 'USD'; // Default to USD
}

module.exports = { mapCountryToCurrency };
