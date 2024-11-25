import { createContext, useReducer, useEffect } from 'react';

const initialState = {
  shoppingBagItems: [],
};

const shoppingBagReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const { id, size } = action.payload;
      const existItem = state.shoppingBagItems.find(
        (item) => item.id === id && item.size === size
      );
      if (existItem) {
        return {
          ...state,
          shoppingBagItems: state.shoppingBagItems.map((item) =>
            item.id === addId && item.size === addSize
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
      const { id, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREMENT': {
      const { id, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
    }
    case 'REMOVE': {
      const { id, size } = action.payload;
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.filter(
          (item) => !(item.id === id && item.size === size)
        ),
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        shoppingBagItems: [],
      };
    }
    default:
      return state;
  }
};

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingBagReducer, initialState, () => {
    const localShoppingBag = localStorage.getItem('banana-pose-shopping-bag');
    return localShoppingBag ? JSON.parse(localShoppingBag) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('banana-pose-shopping-bag', JSON.stringify(state));
  }, [state]);

  return (
    <ShoppingBagContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};
