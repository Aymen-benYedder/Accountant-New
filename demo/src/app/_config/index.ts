import { footerTheme } from "@app/_themes/footer/default";
import { headerTheme } from "@app/_themes/header/default";
import { mainTheme } from "@app/_themes/main/default";
import { sidebarTheme } from "@app/_themes/sidebar/default";
import { JumboThemeConfig } from "@jumbo/types";
import { createJumboTheme } from "@jumbo/utilities/helpers";

export type AppConfig = {
  THEME: JumboThemeConfig;
};

export const config = {
  containerStyle: "fluid",
};
export const CONFIG: AppConfig = {
  THEME: createJumboTheme(mainTheme, headerTheme, sidebarTheme, footerTheme),
};
