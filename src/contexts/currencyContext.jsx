import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD'); // Default to USD
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        // Check if user has selected a currency before
        const storedCurrency = localStorage.getItem('bp-currency');
        if (storedCurrency && SUPPORTED_CURRENCIES.includes(storedCurrency)) {
          console.log('part 1');
          setCurrency(storedCurrency);
        } else {
          console.log('part 2');
          // Fetch from backend based on IP
          const response = await axios.get(
            'http://127.0.0.1:5001/banana-pose/us-central1/api/get-currency'
          );
          if (
            response.data.currency &&
            SUPPORTED_CURRENCIES.includes(response.data.currency)
          ) {
            console.log('part 3');
            setCurrency(response.data.currency);
            localStorage.setItem('bp-currency', response.data.currency);
          } else {
            console.log('part 4');
            setCurrency('USD');
            localStorage.setItem('bp-currency', 'USD');
          }
        }
      } catch (error) {
        console.log('part 5');
        console.error('Error fetching currency:', error);
        setCurrency('USD');
        localStorage.setItem('bp-currency', 'USD');
      } finally {
        console.log('part 6');
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const changeCurrency = (newCurrency) => {
    if (SUPPORTED_CURRENCIES.includes(newCurrency)) {
      setCurrency(newCurrency);
      localStorage.setItem('bp-currency', newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

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
