import { MenuItems, NavSx } from "@jumbo/types";
import { Theme } from "@mui/material";

import { JumboNavbarProvider } from "./components";

type JumboNavbarProps = {
  items: MenuItems;
  groupBehaviour?: "collapsible" | "popover";
  mini?: boolean;
  open?: boolean;
  theme?: Theme;
  navSectionSx?: NavSx;
  navItemSx?: NavSx;
  navGroupSx?: NavSx;
  renderGroupCollapsibleIcon?: (open: boolean) => React.ReactNode;
  sx?: NavSx;
};

function JumboNavbar(
  props: JumboNavbarProps = {
    items: [],
    groupBehaviour: "collapsible",
    mini: false,
    open: true,
  }
) {
  return <JumboNavbarProvider {...props} />;
}

export { JumboNavbar };
