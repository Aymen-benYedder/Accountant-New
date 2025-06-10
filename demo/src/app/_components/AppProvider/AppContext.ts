import React from "react";
import { AppState } from "./_types";

export const AppContext = React.createContext<AppState>({
  customizerVisibility: true,
  setCustomizerVisibility: () => {},
});
