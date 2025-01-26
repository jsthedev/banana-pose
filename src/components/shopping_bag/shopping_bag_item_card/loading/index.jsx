import SkeletonImageLoader from '@/components/skeleton_image_loader';

import '@/components/shopping_bag/shopping_bag_item_card/loading/index.scss';

function ShoppingBagItemCardLoading() {
  return (
    <div className="shopping-bag-item">
      <div className="loading-item-thumbnail">
        <SkeletonImageLoader />
      </div>
      <div className="shopping-bag-loading-item-contents-wrapper">
        <div className="top-content">
          <div className="loading-item-details">
            <div className="loading-item-name loading-item-detail">Name</div>
            <div className="loading-item-size loading-item-detail">Size:</div>
            <div className="loading-item-color loading-item-detail">Color:</div>
            <div className="loading-item-quantity loading-item-detail">
              <div className="quantity-text">Quantity:</div>
            </div>
          </div>
          <div className="loading-item-price">$100</div>
        </div>
        <div className="bottom-content">
          <div className="remove-button normal-link">Remove</div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBagItemCardLoading;
