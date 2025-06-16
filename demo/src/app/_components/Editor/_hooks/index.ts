// demo\src\app\_components\Editor\_hooks\index.ts
import { useContext } from "react";
import { EditorContext } from "../EditorContext";
import type { EditorContextType } from "../EditorContext";

export function useEditor(): EditorContextType {
  return useContext(EditorContext);
}
