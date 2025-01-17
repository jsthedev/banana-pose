import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/shopping_bag/shopping_bag_item_card/loading/index.scss';

function ShoppingBagItemCardLoading() {
  return (
    <div className="shopping-bag-item">
      <div className="item-thumbnail">
        <SkeletonImageLoader />
      </div>
      <div className="shopping-bag-item-contents-wrapper">
        <div className="top-content">
          <div className="item-details">
            <div className="item-name item-detail">Name</div>
            <div className="item-size item-detail">Size:</div>
            <div className="item-color item-detail">Color:</div>
            <div className="item-quantity item-detail">
              <div className="quantity-text">Quantity:</div>
            </div>
          </div>
          <div className="item-price">$100</div>
        </div>
        <div className="bottom-content">
          <div className="remove-button normal-link">Remove</div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBagItemCardLoading;
