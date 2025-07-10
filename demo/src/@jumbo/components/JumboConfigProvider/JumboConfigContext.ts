import { JumboConfigContextType } from "@jumbo/types";
import { Link } from "react-router-dom";
import React from "react";

const defaultContextValue: JumboConfigContextType = {
  LinkComponent: Link,
};

const JumboConfigContext = React.createContext(defaultContextValue);

export { JumboConfigContext };
