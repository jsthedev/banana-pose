import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { SUPPORTED_CURRENCIES } from '@/constants/currencies';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(null);

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
            `${import.meta.env.VITE_FIREBASE_FUNCTIONS_ENDPOINT}/get-currency`
          );
          if (
            response.data.currency &&
            SUPPORTED_CURRENCIES.includes(response.data.currency)
          ) {
            setCurrency(response.data.currency);
            localStorage.setItem('bp-currency', response.data.currency);
          } else {
            setCurrency('USD'); // Default to USD
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
      {children}
    </CurrencyContext.Provider>
  );
};
