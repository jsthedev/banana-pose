import { useContext, useState } from 'react';
import { CurrencyContext } from '@/contexts/CurrencyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import auFlag from '@/assets/images/flags/au.svg';
import caFlag from '@/assets/images/flags/ca.svg';
import cnFlag from '@/assets/images/flags/cn.svg';
import euFlag from '@/assets/images/flags/eu.svg';
import jpFlag from '@/assets/images/flags/jp.svg';
import krFlag from '@/assets/images/flags/kr.svg';
import nzFlag from '@/assets/images/flags/nz.svg';
import ukFlag from '@/assets/images/flags/uk.svg';
import usFlag from '@/assets/images/flags/us.svg';

import '@/components/currency_selector/index.scss';

const SUPPORTED_CURRENCIES = {
  CAD: caFlag,
  USD: usFlag,
  KRW: krFlag,
  CNY: cnFlag,
  JPY: jpFlag,
  EUR: euFlag,
  GBP: ukFlag,
  AUD: auFlag,
  NZD: nzFlag,
};

const CURRENCY_SYMBOLS = {
  CAD: '$',
  USD: '$',
  KRW: '₩',
  CNY: '¥',
  JPY: '¥',
  EUR: '€',
  GBP: '£',
  AUD: '$',
  NZD: '$',
};

function CurrencySelector() {
  const { currency, changeCurrency } = useContext(CurrencyContext);

  const handleChange = (e) => {
    changeCurrency(e.target.value);
  };

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const toggleSelector = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  return (
    <div className="currency-selector">
      <div
        className={`selector-button ${isSelectorOpen ? 'opened' : ''}`}
        onClick={toggleSelector}
      >
        <div className="flag-img-wrapper">
          <img src={SUPPORTED_CURRENCIES[currency]} className="flag-img" />
        </div>
        <div className="chevron-down">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {isSelectorOpen && (
        <div className="expanded-selector">
          {Object.entries(SUPPORTED_CURRENCIES).map(([curr, flag]) => (
            <div
              className="currency-option"
              onClick={() => {
                changeCurrency(curr);
                setIsSelectorOpen(false); // Close selector on selection
              }}
            >
              <div className="flag-img-wrapper">
                <img src={flag} className="flag-img" />
              </div>
              <div className="currency-name">
                {curr} ({CURRENCY_SYMBOLS[curr] || ''})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencySelector;
