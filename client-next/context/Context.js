import { useReducer, useContext, createContext } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const StateProviderContext = createContext();

export const ContextProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // add methods you want to make available globally in the app here, then pass to value of StateProviderContext.Provider
  return (
    <StateProviderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StateProviderContext.Provider>
  );
};

export const useGlobalContext = () => useContext(StateProviderContext);
