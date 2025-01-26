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
    case 'SET_QUANTITY': {
      const { productId, variantId, size, setNumber } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.map((item) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.size === size
            ? { ...item, quantity: setNumber }
            : item
        ),
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        shoppingBagItems: [],
      };
    }
    case 'VALIDATE': {
      const { products } = action.payload;
      const validItems = validateShoppingBagItems(
        state.shoppingBagItems,
        products
      );
      // Only update state if validItems differ from current shoppingBagItems
      const areEqual =
        validItems.length === state.shoppingBagItems.length &&
        validItems.every(
          (item, index) =>
            item.productId === state.shoppingBagItems[index].productId &&
            item.variantId === state.shoppingBagItems[index].variantId &&
            item.size === state.shoppingBagItems[index].size &&
            item.quantity === state.shoppingBagItems[index].quantity
        );
      if (areEqual) {
        return state;
      }
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
    // Update the local storage with the shopping bag items
    localStorage.setItem('banana-pose-shopping-bag', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (productsLoading) {
      return;
    }

    if (!productsLoading && state.shoppingBagItems.length > 0) {
      dispatch({
        type: 'VALIDATE',
        payload: { products: products },
      });
    }
  }, [products, productsLoading, state]);

  return (
    <ShoppingBagContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};
