import { Palette, SxProps, Theme } from "@mui/material";
import React from "react";

export type NavSx = (
  currentSx: SxProps<Theme>,
  miniAndClosed?: boolean
) => SxProps<Theme>;

type NavbarContext = {
  items: MenuItems;
  groupBehaviour: "collapsible" | "popover";
  mini: boolean;
  open: boolean;
  theme: Theme;
  miniAndClosed: boolean;
  navSectionSx?: NavSx;
  navGroupSx?: NavSx;
  navItemSx?: NavSx;
  renderGroupCollapsibleIcon?: (open: boolean) => React.ReactNode;
};

type NavbarItem = {
  label: string;
  path: string;
  icon?: string | React.ReactNode;
  target?: string;
  navItemSx?: NavSx;
};

type NavbarGroup = {
  label: string;
  children: (NavbarGroup | NavbarItem)[];
  collapsible?: boolean;
  icon?: string;
  navGroupSx?: NavSx;
};

type NavbarSection = {
  label: string;
  children: (NavbarGroup | NavbarItem)[];
  navSectionSx?: NavSx;
};

type MenuItem = NavbarSection | NavbarGroup | NavbarItem;
type MenuItems = MenuItem[];

type NavbarTheme = Theme & {
  palette: Palette & {
    nav: {
      action: {
        active: string;
        hover: string;
      };
      background: {
        active: string;
        hover: string;
      };
      tick: {
        active: string;
        hover: string;
      };
    };
  };
};
export {
  type MenuItem,
  type MenuItems,
  type NavbarContext,
  type NavbarGroup,
  type NavbarItem,
  type NavbarSection,
  type NavbarTheme,
};
