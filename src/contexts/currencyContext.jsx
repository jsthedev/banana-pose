import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(null); // Default to USD

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        // Check if user has selected a currency before
        const storedCurrency = localStorage.getItem('bp-currency');
        if (storedCurrency && SUPPORTED_CURRENCIES.includes(storedCurrency)) {
          setCurrency(storedCurrency);
        } else {
          // Fetch from backend based on IP
          const response = await axios.get(
            'http://127.0.0.1:5001/banana-pose/us-central1/api/get-currency'
          );
          if (
            response.data.currency &&
            SUPPORTED_CURRENCIES.includes(response.data.currency)
          ) {
            setCurrency(response.data.currency);
            localStorage.setItem('bp-currency', response.data.currency);
          } else {
            setCurrency('USD');
            localStorage.setItem('bp-currency', 'USD');
          }
        }
      } catch (error) {
        console.error('Error fetching currency:', error);
        setCurrency('USD');
        localStorage.setItem('bp-currency', 'USD');
      } finally {
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
      {!loading && children}
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
