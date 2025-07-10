import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { MenuItems, NavSx } from "@jumbo/types";
import { isNavSection } from "@jumbo/utilities/helpers";
import { List, Theme } from "@mui/material";
import { JumboNavIdentifier } from "..";
import { JumboNavbarContext } from "./JumboNavbarContext";

type JumboNavbarProviderProps = {
  items: MenuItems;
  mini?: boolean;
  open?: boolean;
  theme?: Theme;
  groupBehaviour?: "collapsible" | "popover";
  navSectionSx?: NavSx;
  navItemSx?: NavSx;
  navGroupSx?: NavSx;
  renderGroupCollapsibleIcon?: (open: boolean) => React.ReactNode;
  sx?: NavSx;
};
function JumboNavbarProvider({
  items = [],
  mini = false,
  open = true,
  groupBehaviour = "collapsible",
  theme,
  navSectionSx,
  navItemSx,
  navGroupSx,
  renderGroupCollapsibleIcon,
  sx,
}: JumboNavbarProviderProps) {
  const miniAndClosed: boolean = !!mini && !open;
  const { theme: jumboTheme } = useJumboTheme();
  const contextValue = {
    items,
    miniAndClosed,
    theme: theme || jumboTheme,
    groupBehaviour,
    mini,
    open,
    navSectionSx,
    navItemSx,
    navGroupSx,
    renderGroupCollapsibleIcon,
  };

  let isFirstSection = true;
  const sxValue = sx
    ? sx(
        {
          mr: miniAndClosed ? 0 : 2,
          pb: 2,
        },
        miniAndClosed
      )
    : {
        mr: miniAndClosed ? 0 : 2,
        pb: 2,
      };
  return (
    <JumboNavbarContext.Provider value={contextValue}>
      <List disablePadding sx={sxValue}>
        {items.map((item, index) => {
          if (isNavSection(item) && isFirstSection === true) {
            isFirstSection = false;
            return (
              <JumboNavIdentifier
                item={item}
                key={index}
                isFirstSection={true}
              />
            );
          }
          return <JumboNavIdentifier item={item} key={index} />;
        })}
      </List>
    </JumboNavbarContext.Provider>
  );
}

export { JumboNavbarProvider };
