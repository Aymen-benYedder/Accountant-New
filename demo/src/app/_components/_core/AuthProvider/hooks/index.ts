import React from "react";
import { AuthContext } from "../AuthContext";

export function useAuth(): any {
  return React.useContext(AuthContext);
}
