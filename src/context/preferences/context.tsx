import React, { createContext, useContext, useReducer } from "react";
import { PreferencesActions, PreferencesState, preferencesReducer, initialPreferencesState } from "./reducer";

const PreferencesStateContext = createContext<PreferencesState | undefined>(undefined);
const PreferencesDispatchContext = createContext<React.Dispatch<PreferencesActions> | undefined>(undefined);

export const usePreferencesState = () => {
  const context = useContext(PreferencesStateContext);
  if (context === undefined) {
    throw new Error("usePreferencesState must be used within a PreferencesProvider");
  }
  return context;
};

export const usePreferencesDispatch = () => {
  const context = useContext(PreferencesDispatchContext);
  if (context === undefined) {
    throw new Error("usePreferencesDispatch must be used within a PreferencesProvider");
  }
  return context;
};

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialPreferencesState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>{children}</PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};
