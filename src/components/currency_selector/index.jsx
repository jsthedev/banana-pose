import React, { useContext } from 'react';
import { CurrencyContext } from '@/contexts/CurrencyContext';

const SUPPORTED_CURRENCIES = [
  'CAD',
  'USD',
  'CNY',
  'JPY',
  'EUR',
  'GBP',
  'KRW',
  'AUD',
  'NZD',
];

function CurrencySelector() {
  const { currency, changeCurrency } = useContext(CurrencyContext);

  const handleChange = (e) => {
    changeCurrency(e.target.value);
  };

  return (
    <select value={currency} onChange={handleChange}>
      {SUPPORTED_CURRENCIES.map((curr) => (
        <option key={curr} value={curr}>
          {curr}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelector;
