import React, { createContext } from "react";
import { AppState, initialState } from "./state";
import { AppActions } from "./actions";

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
