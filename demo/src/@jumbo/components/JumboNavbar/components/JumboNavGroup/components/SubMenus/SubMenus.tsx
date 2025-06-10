import { MenuItems } from "@jumbo/types";
import { List } from "@mui/material";
import { JumboNavIdentifier } from "../../..";

type SubMenusProps = {
  items: MenuItems;
  miniAndClosed: boolean;
};

function SubMenus({ items }: SubMenusProps) {
  return (
    <List disablePadding>
      {items.map((child, index) => {
        const eventKey = new Date().valueOf();
        return (
          <JumboNavIdentifier
            item={child}
            key={`${eventKey}${index}`}
            isNested={true}
          />
        );
      })}
    </List>
  );
}

export { SubMenus };
