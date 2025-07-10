import { Divider, ListSubheader } from "@mui/material";
import React from "react";
import { SettingMenusProps } from "../setting-menus-items";

type NavSectionTypes = {
  item: SettingMenusProps;
  primary: number;
  isFirstSection?: boolean;
};
const NavSectionSettingItem = ({ item, primary }: NavSectionTypes) => {
  return (
    <React.Fragment>
      {primary !== 0 && <Divider component="li" sx={{ my: 2 }} />}
      <ListSubheader
        component="li"
        disableSticky
        sx={{
          fontWeight: 400,
          lineHeight: "normal",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontSize: 12,
          p: (theme) => theme.spacing(1.5, 2),
        }}
      >
        {item.label}
      </ListSubheader>
    </React.Fragment>
  );
};

export { NavSectionSettingItem };
