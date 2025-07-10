import { footerTheme as footerThemeDefault } from "@app/_themes/footer/default";
import { headerTheme as headerThemeDefault } from "@app/_themes/header/default";
import { mainTheme as defaultTheme } from "@app/_themes/main/default";
import { mainTheme as theme1 } from "@app/_themes/main/theme1";
import { mainTheme as theme2 } from "@app/_themes/main/theme2";
import { mainTheme as theme3 } from "@app/_themes/main/theme3";
import { mainTheme as theme4 } from "@app/_themes/main/theme4";
import { sidebarTheme as sidebarThemeDefault } from "@app/_themes/sidebar/default";
import { useJumboLayout } from "@jumbo/components/JumboLayout/hooks";
import {
  useJumboFooterTheme,
  useJumboHeaderTheme,
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { Div, Span } from "@jumbo/shared";
import { CheckCircle } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import { CustomizerCard } from "../CustomizerCard";
const options = [
  {
    name: "theme-1",
    label: "Theme 1",
    colors: {
      primary: "#7352C7",
      secondary: "#E44A77",
    },
    themeObject: defaultTheme,
  },
  {
    name: "theme-2",
    label: "Theme 2",
    colors: {
      primary: "#161e54",
      secondary: "#ff5151",
    },
    themeObject: theme1,
  },
  {
    name: "theme-3",
    label: "Theme 3",
    colors: {
      primary: "#1db9c3",
      secondary: "#7027a0",
    },
    themeObject: theme2,
  },
  {
    name: "theme-4",
    label: "Theme 4",
    colors: {
      primary: "#002366",
      secondary: "#0f52ba",
    },
    themeObject: theme3,
  },
  {
    name: "theme-5",
    label: "Theme 5",
    colors: {
      primary: "#54436b",
      secondary: "#50cb93",
    },
    themeObject: theme4,
  },
];

export const MainThemeOptions = () => {
  const { theme, setTheme } = useJumboTheme();
  const { setSidebarTheme } = useJumboSidebarTheme();
  const { setHeaderTheme } = useJumboHeaderTheme();
  const { setFooterTheme } = useJumboFooterTheme();
  const { headerOptions, setHeaderOptions } = useJumboLayout();

  const handleThemeChange = React.useCallback(
    (themeOption: any) => {
      if (theme.type === "light") {
        setTheme(themeOption.themeObject);
      } else {
        setTheme({ type: "light", ...defaultTheme });
        setHeaderTheme({ ...theme, ...headerThemeDefault });
        setSidebarTheme({ ...theme, ...sidebarThemeDefault });
        setFooterTheme({ ...theme, ...footerThemeDefault });
        setHeaderOptions({
          ...headerOptions,
          sx: { ...headerOptions.sx, boxShadow: "none" },
        });
      }
    },
    [theme]
  );

  return (
    <CustomizerCard title="Main Theme">
      <Stack spacing={1.25} direction={"row"}>
        {options.map((option) => {
          return (
            <Div
              sx={{
                display: "flex",
                minWidth: 0,
                flex: 1,
                cursor: "pointer",
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",

                "& .MuiIconButton-root": {
                  position: "absolute",
                  color: "#4caf50",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
              key={option.name}
              onClick={() => handleThemeChange(option)}
            >
              <Span
                sx={{ bgcolor: option.colors.primary, width: 25, height: 50 }}
              />
              <Span
                sx={{ bgcolor: option.colors.secondary, width: 25, height: 50 }}
              />
              {theme?.palette?.primary?.main === option.colors?.primary && (
                <IconButton>
                  <CheckCircle />
                </IconButton>
              )}
            </Div>
          );
        })}
      </Stack>
    </CustomizerCard>
  );
};
