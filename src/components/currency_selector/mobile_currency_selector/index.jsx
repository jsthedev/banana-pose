import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faTimes,
  faT,
} from '@fortawesome/free-solid-svg-icons';

import { CurrencyContext } from '@/contexts/currencyContext';

import { CURRENCY_FLAGS, CURRENCY_SYMBOLS } from '@/constants/currencies';

import '@/components/currency_selector/mobile_currency_selector/index.scss';

function MobileCurrencySelector() {
  const { currency, changeCurrency } = useContext(CurrencyContext);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const toggleSelector = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };
  const closeSelector = () => {
    setIsSelectorOpen(false);
  };

  return (
    <div className="mobile-currency-selector">
      <div className="mobile-currency-selector-button" onClick={toggleSelector}>
        <div className="current-currency">
          <div className="flag-img-wrapper">
            <img src={CURRENCY_FLAGS[currency]} className="flag-img" />
          </div>
          <div className="currency-name">
            {currency} ({CURRENCY_SYMBOLS[currency] || ''})
          </div>
        </div>
        <div className="chevron-right">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      {isSelectorOpen && (
        <div className="mobile-currency-selector-menu">
          <div className="sub-header">
            <div className="left-content">
              <div className="chevron-left" onClick={closeSelector}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              <div className="sub-header-title">Currency</div>
            </div>
            <div className="close-button" onClick={closeSelector}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="current-currency-reminder">
            Your current currency is {currency}.
          </div>
          {Object.entries(CURRENCY_FLAGS).map(([curr, flag]) => (
            <div
              className="currency-option"
              onClick={() => {
                changeCurrency(curr);
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

export default MobileCurrencySelector;
