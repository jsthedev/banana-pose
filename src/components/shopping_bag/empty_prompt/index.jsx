import { Link } from 'react-router-dom';

import '@/components/shopping_bag/empty_prompt/index.scss';

function EmptyPrompt() {
  return (
    <div className="empty-prompt">
      <div className="shopping-bag-page-name">Shopping bag</div>
      <div className="empty-prompt-contents">
        <p>Your shopping bag is empty</p>
        <Link to={'/products'} className="link-button">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}

export default EmptyPrompt;
