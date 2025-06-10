import { useContext } from "react";
import { EditorContext } from "../EditorContext";

export function useEditor() {
  return useContext(EditorContext);
}
