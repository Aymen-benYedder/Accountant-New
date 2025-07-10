import { footerTheme as footerThemeDark } from "@app/_themes/footer/dark";
import { footerTheme as footerThemeDefault } from "@app/_themes/footer/default";
import { footerTheme as footerThemeSemiDark } from "@app/_themes/footer/semi-dark";
import { headerTheme as headerThemeDark } from "@app/_themes/header/dark";
import { headerTheme as headerThemeDefault } from "@app/_themes/header/default";
import { headerTheme as headerThemeSemiDark } from "@app/_themes/header/semi-dark";
import { mainTheme as mainThemeDark } from "@app/_themes/main/dark";
import { mainTheme as mainThemeDefault } from "@app/_themes/main/default";
import { mainTheme as mainThemeSemiDark } from "@app/_themes/main/semi-dark";
import { sidebarTheme as sidebarThemeDark } from "@app/_themes/sidebar/dark";
import { sidebarTheme as sidebarThemeDefault } from "@app/_themes/sidebar/default";
import { sidebarTheme as sidebarThemeSemiDark } from "@app/_themes/sidebar/semi-dark";
import { useJumboLayout } from "@jumbo/components/JumboLayout/hooks";
import {
  useJumboFooterTheme,
  useJumboHeaderTheme,
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import { IconButton, Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { CustomizerCard } from "../CustomizerCard";

export const ThemeModeOption = () => {
  const { theme, setTheme } = useJumboTheme();
  const { setSidebarTheme } = useJumboSidebarTheme();
  const { setHeaderTheme } = useJumboHeaderTheme();
  const { setFooterTheme } = useJumboFooterTheme();
  const { headerOptions, setHeaderOptions } = useJumboLayout();

  const handleModeChange = React.useCallback(
    (type: string) => {
      switch (type) {
        case "light":
          setTheme({ type: "light", ...mainThemeDefault });
          setHeaderTheme({ ...theme, ...headerThemeDefault });
          setSidebarTheme({ ...theme, ...sidebarThemeDefault });
          setFooterTheme({ ...theme, ...footerThemeDefault });
          setHeaderOptions({
            ...headerOptions,
            sx: { ...headerOptions.sx, boxShadow: "none" },
          });
          return;
        case "semi-dark":
          setTheme({ type: "semi-dark", ...mainThemeSemiDark });
          setHeaderTheme({ ...theme, ...headerThemeSemiDark });
          setSidebarTheme({ ...theme, ...sidebarThemeSemiDark });
          setFooterTheme({ ...theme, ...footerThemeSemiDark });
          setHeaderOptions({
            ...headerOptions,
            sx: { ...headerOptions.sx, boxShadow: 23 },
          });
          return;
        case "dark":
          setTheme({ type: "dark", ...mainThemeDark });
          setHeaderTheme({ ...theme, ...headerThemeDark });
          setSidebarTheme({ ...theme, ...sidebarThemeDark });
          setFooterTheme({ ...theme, ...footerThemeDark });
          setHeaderOptions({
            ...headerOptions,
            sx: { ...headerOptions.sx, boxShadow: 23 },
          });
          return;
      }
    },
    [theme, setTheme, setFooterTheme, setHeaderTheme, setSidebarTheme]
  );
  return (
    <CustomizerCard title={"Theme"}>
      <Div sx={{ color: (theme) => theme.palette.text.secondary }}>
        <Stack spacing={2.5} direction={"row"}>
          <Div sx={{ textAlign: "center" }}>
            <Tooltip title="Light">
              <IconButton
                aria-label="Light"
                onClick={() => handleModeChange("light")}
                color={theme.type === "light" ? "primary" : "inherit"}
                sx={{
                  p: 2,
                  backgroundColor: "var(--IconButton-hoverBg)",
                }}
              >
                <RiSunLine fontSize={28} />
              </IconButton>
            </Tooltip>
          </Div>

          <Div sx={{ textAlign: "center" }}>
            <Tooltip title="Semi Dark">
              <IconButton
                aria-label="SemiDark"
                onClick={() => handleModeChange("semi-dark")}
                color={theme.type === "semi-dark" ? "primary" : "inherit"}
                sx={{
                  p: 2,
                  backgroundColor: "var(--IconButton-hoverBg)",
                }}
              >
                <WiMoonAltFirstQuarter fontSize={28} />
              </IconButton>
            </Tooltip>
          </Div>

          <Div sx={{ textAlign: "center" }}>
            <Tooltip title="Dark">
              <IconButton
                aria-label="Dark"
                onClick={() => handleModeChange("dark")}
                color={theme.type === "dark" ? "primary" : "inherit"}
                sx={{
                  p: 2,
                  backgroundColor: "var(--IconButton-hoverBg)",
                }}
              >
                <RiMoonLine fontSize={28} />
              </IconButton>
            </Tooltip>
          </Div>
        </Stack>
      </Div>
    </CustomizerCard>
  );
};
