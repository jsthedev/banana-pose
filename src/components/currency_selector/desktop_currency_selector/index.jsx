import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { CurrencyContext } from '@/contexts/CurrencyContext';

import { CURRENCY_FLAGS, CURRENCY_SYMBOLS } from '@/constants/currencies';

import '@/components/currency_selector/desktop_currency_selector/index.scss';

function DesktopCurrencySelector() {
  const { currency, changeCurrency } = useContext(CurrencyContext);

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
          <img src={CURRENCY_FLAGS[currency]} className="flag-img" />
        </div>
        <div className="chevron-down">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      {isSelectorOpen && (
        <div className="expanded-selector">
          {Object.entries(CURRENCY_FLAGS).map(([curr, flag]) => (
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

export default DesktopCurrencySelector;
