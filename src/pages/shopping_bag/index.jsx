import { useContext } from 'react';

import { ShoppingBagContext } from '@/contexts/shoppingBagContext';

import EmptyPrompt from '@/components/shopping_bag/empty_prompt';
import ShoppingBagContents from '@/components/shopping_bag/shopping_bag_contents';

import '@/pages/shopping_bag/index.scss';

function ShoppingBag() {
  // Contexts
  const { state } = useContext(ShoppingBagContext);

  // Variables
  const isBagEmpty = state.shoppingBagItems.length === 0;

  return (
    <div className="shopping-bag">
      <div className="shopping-bag-container">
        {isBagEmpty ? <EmptyPrompt /> : <ShoppingBagContents />}
      </div>
    </div>
  );
}

export default ShoppingBag;
