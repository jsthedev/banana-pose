import { createContext, useReducer, useEffect, useContext } from 'react';

import { ProductsContext } from '@/contexts/productsContext';

import { validateShoppingBagItems } from '@/utils/shopping_bag_context.js';

const initialState = {
  shoppingBagItems: [],
};

const shoppingBagReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const { productId, variantId, size } = action.payload;
      const existItem = state.shoppingBagItems.find(
        (item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === size
      );
      if (existItem) {
        return {
          ...state,
          shoppingBagItems: state.shoppingBagItems.map((item) =>
            item.productId === productId &&
            item.variantId === variantId &&
            item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          shoppingBagItems: [
            ...state.shoppingBagItems,
            { ...action.payload, quantity: 1 },
          ],
        };
      }
    }
    case 'INCREMENT': {
      const { productId, variantId, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.map((item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREMENT': {
      const { productId, variantId, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.map((item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === size
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
    }
    case 'REMOVE': {
      const { productId, variantId, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.variantId === variantId &&
              item.size === size
            )
        ),
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        shoppingBagItems: [],
      };
    }
    /*
      TODO: one potential issue:
      if the user add the item to the bag
      and the product turns to sold out from stripe,
      the user can still purchase the item.
      The only way to prevent is if the user
      refreshes the page or change currency.
      Otherwise, manually handle the situation. 
    */
    case 'VALIDATE': {
      const { products } = action.payload;
      const validItems = validateShoppingBagItems(
        state.shoppingBagItems,
        products
      );
      return {
        ...state,
        shoppingBagItems: validItems,
      };
    }

    default:
      return state;
  }
};

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const { products, loading: productsLoading } = useContext(ProductsContext);

  const [state, dispatch] = useReducer(shoppingBagReducer, initialState, () => {
    const localShoppingBag = localStorage.getItem('banana-pose-shopping-bag');
    return localShoppingBag ? JSON.parse(localShoppingBag) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('banana-pose-shopping-bag', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (productsLoading) {
      return;
    }

    if (products) {
      dispatch({
        type: 'VALIDATE',
        payload: { products },
      });
    }
  }, [products]);

  return (
    <ShoppingBagContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};
