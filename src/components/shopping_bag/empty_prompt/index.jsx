import { Link } from 'react-router-dom';

import '@/components/shopping_bag/empty_prompt/index.scss';

function EmptyPrompt() {
  return (
    <div className="empty-prompt">
      <p>Your shopping bag is empty</p>
      <Link to={'/products'} className="continue-shopping-link">
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}

export default EmptyPrompt;
