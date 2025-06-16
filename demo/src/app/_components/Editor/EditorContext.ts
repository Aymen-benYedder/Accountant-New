// demo\src\app\_components\Editor\EditorContext.ts
import React from "react";
import { EditorElement } from "./_types";

export interface EditorContextType {
  data: EditorElement[];
  onNewElement: (el?: EditorElement) => void;
}

const defaultContext: EditorContextType = {
  data: [],
  onNewElement: () => {},
};

export const EditorContext =
  React.createContext<EditorContextType>(defaultContext);
