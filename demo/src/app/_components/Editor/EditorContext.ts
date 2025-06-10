import React from "react";
import { EditorElement } from "./_types";

interface EditorContextType {
  data: EditorElement[];
  onNewElement: (el?: EditorElement) => void;
}

const defaultContext: EditorContextType = {
  data: [],
  onNewElement: () => {},
};

export const EditorContext =
  React.createContext<EditorContextType>(defaultContext);
