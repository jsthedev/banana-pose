import { createContext, useReducer, useEffect } from 'react';

const initialState = {
  shoppingBagItems: [],
};

const shoppingBagReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const { id, size } = action.payload;
      const existItem = state.shoppingBagItems.find(
        (x) => (x.id === id) & (x.size === size)
      );
      if (existItem) {
        return {
          ...state,
          shoppingBagItems: state.shoppingBagItems.map((x) =>
            x.id === id && x.size === size
              ? { ...x, quantity: x.quantity + 1 }
              : x
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
    case 'REMOVE':
      return {
        ...state,
        shoppingBagItems: state.shoppingBagItems.filter(
          (x) => !(x.id === action.payload && x.size === size)
        ),
      };
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
