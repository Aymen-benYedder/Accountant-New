import { config } from "@app/_config";
import React from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./_types";
import { APP_ACTIONS } from "./_utilities/actions";

function init(initialValue: AppState) {
  return {
    customizerVisibility: initialValue.customizerVisibility,
    containerStyle: initialValue.containerStyle,
    rebuildRoutes: true,
  };
}

function appReducer(
  state: AppState,
  action: { type: APP_ACTIONS; payload: any }
) {
  switch (action.type) {
    case APP_ACTIONS.SET_CUSTOMIZER_VISIBILITY:
      return {
        ...state,
        customizerVisibility: action.payload,
      };

    case APP_ACTIONS.SET_CONTAINER_STYLE:
      return {
        ...state,
        containerStyle: action.payload,
      };

    case APP_ACTIONS.SET_APP:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [app, setApp] = React.useReducer(
    appReducer,
    {
      customizerVisibility: false,
      containerStyle: config.containerStyle,
    },
    init
  );

  const setCustomizerVisibility = React.useCallback(
    (value: boolean) => {
      setApp({ type: APP_ACTIONS.SET_CUSTOMIZER_VISIBILITY, payload: value });
    },
    [setApp]
  );

  const setContainerStyle = React.useCallback(
    (containerStyle: string) => {
      setApp({
        type: APP_ACTIONS.SET_CONTAINER_STYLE,
        payload: containerStyle,
      });
    },
    [setApp]
  );

  const setAppState = React.useCallback(
    (stateObject: AppState) => {
      setApp({ type: APP_ACTIONS.SET_APP, payload: stateObject });
    },
    [setApp]
  );

  const contextValue = React.useMemo(
    () => ({
      ...app,
      setCustomizerVisibility,
      setContainerStyle,
      setAppState,
    }),
    [app, setCustomizerVisibility, setContainerStyle, setAppState]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
