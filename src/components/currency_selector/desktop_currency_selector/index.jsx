import { useContext, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { CurrencyContext } from '@/contexts/currencyContext';

import { blankImage } from '@/assets/images/common/blank_image';
import { CURRENCY_FLAGS, CURRENCY_SYMBOLS } from '@/constants/currencies';

import '@/components/currency_selector/desktop_currency_selector/index.scss';

function DesktopCurrencySelector() {
  const {
    currency,
    changeCurrency,
    loading: currencyLoading,
  } = useContext(CurrencyContext);

  const currentFlag = currencyLoading ? blankImage : CURRENCY_FLAGS[currency];

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const selectorRef = useRef(null);

  const toggleSelector = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  const closeSelector = () => {
    setIsSelectorOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      closeSelector();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="currency-selector" ref={selectorRef}>
      <div
        className={`selector-button ${isSelectorOpen ? 'opened' : ''}`}
        onClick={toggleSelector}
      >
        <div className="flag-img-wrapper">
          <img src={currentFlag} className="flag-img" />
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
              key={curr}
              onClick={() => {
                changeCurrency(curr);
                closeSelector();
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
