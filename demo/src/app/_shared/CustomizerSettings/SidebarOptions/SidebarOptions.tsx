import { footerTheme as footerThemeDefault } from "@app/_themes/footer/default";
import { headerTheme as headerThemeDefault } from "@app/_themes/header/default";
import { mainTheme as defaultTheme } from "@app/_themes/main/default";
import { sidebarTheme as darkTheme } from "@app/_themes/sidebar/dark";
import { sidebarTheme as sidebarThemeDefault } from "@app/_themes/sidebar/default";
import { sidebarTheme as theme1 } from "@app/_themes/sidebar/theme1";
import {
  useJumboFooterTheme,
  useJumboHeaderTheme,
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";

import { useJumboLayout } from "@jumbo/components/JumboLayout/hooks";
import { Div, Span } from "@jumbo/shared";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { CustomizerCard } from "../CustomizerCard";
import {
  BgColorOptionProps,
  bgColorOptions,
  BgImageOptionProps,
  bgImageOptions,
} from "./data";

export const SidebarOptions = () => {
  const [activeBgColorOption, setActiveBgColorOption] =
    React.useState<BgColorOptionProps | null>();
  const [activeBgImage, setActiveBgImage] =
    React.useState<BgImageOptionProps | null>();
  const { theme, setTheme } = useJumboTheme();
  const { setHeaderTheme } = useJumboHeaderTheme();
  const { setFooterTheme } = useJumboFooterTheme();
  const { headerOptions, setHeaderOptions } = useJumboLayout();
  const { sidebarTheme, setSidebarTheme } = useJumboSidebarTheme();

  const handleBgSelectionChange = React.useCallback(
    (option: any) => {
      if (theme.type === "light") {
        if (option?.type === "single" || option?.type === "gradient") {
          setActiveBgColorOption(option);
        } else {
          setActiveBgImage(option);
        }
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

  React.useEffect(() => {
    if (activeBgColorOption && theme.type === "light") {
      const updatedSidebarTheme = { ...sidebarTheme, ...theme1 };

      if (!updatedSidebarTheme.sidebar) {
        updatedSidebarTheme.sidebar = {};
      }
      if (activeBgImage) {
        updatedSidebarTheme.sidebar.bgimage = activeBgImage.full;

        if (activeBgColorOption.type === "single") {
          updatedSidebarTheme.sidebar.overlay = {
            bgcolor: activeBgColorOption.color,
            opacity: 0.85,
          };
        } else {
          updatedSidebarTheme.sidebar.overlay = {
            bgcolor: activeBgColorOption.colors,
            opacity: 0.85,
          };
        }
      } else {
        if (activeBgColorOption.type === "single") {
          updatedSidebarTheme.sidebar.overlay = {
            bgcolor: activeBgColorOption.color,
          };
        } else {
          updatedSidebarTheme.sidebar.overlay = {
            bgcolor: activeBgColorOption.colors,
          };
        }
      }

      setSidebarTheme((prevTheme) => {
        if (JSON.stringify(prevTheme) !== JSON.stringify(updatedSidebarTheme)) {
          return updatedSidebarTheme;
        }
        return prevTheme;
      });
    }
  }, [
    activeBgColorOption,
    activeBgImage,
    setSidebarTheme,
    sidebarTheme,
    theme,
  ]);
  return (
    <CustomizerCard title={"Sidebar Options"}>
      <Typography variant={"h6"} mb={2}>
        Background Color
      </Typography>
      <Stack spacing={1.25} direction={"row"} mb={3}>
        {bgColorOptions.map((option) => {
          if (option.type === "single")
            return (
              <Div
                sx={{
                  display: "flex",
                  minWidth: 0,
                  cursor: "pointer",
                  position: "relative",

                  "& .MuiIconButton-root": {
                    position: "absolute",
                    color: "#4caf50",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
                key={option.name}
                onClick={() => handleBgSelectionChange(option)}
              >
                <Span
                  sx={{
                    borderRadius: 1,
                    bgcolor: option.color,
                    width: 49,
                    height: 100,
                  }}
                />
                {sidebarTheme?.sidebar?.overlay?.bgcolor === option.color && (
                  <IconButton>
                    <CheckCircleIcon />
                  </IconButton>
                )}
              </Div>
            );
        })}
      </Stack>
      <Typography variant={"h6"} mb={2}>
        Background Gradient
      </Typography>
      <Stack spacing={1.25} direction={"row"} mb={3}>
        {bgColorOptions.map((option) => {
          if (option.type === "gradient") {
            return (
              <Div
                sx={{
                  display: "flex",
                  minWidth: 0,
                  cursor: "pointer",
                  position: "relative",

                  "& .MuiIconButton-root": {
                    position: "absolute",
                    color: "#4caf50",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                }}
                key={option.name}
                onClick={() => handleBgSelectionChange(option)}
              >
                <Span
                  sx={{
                    borderRadius: 1,
                    width: 49,
                    height: 100,
                    backgroundImage: option.colors
                      ? `linear-gradient(${option.colors[0]}, ${option.colors[1]})`
                      : null,
                  }}
                />
                {sidebarTheme?.sidebar?.overlay?.bgcolor === option.colors && (
                  <IconButton>
                    <CheckCircleIcon />
                  </IconButton>
                )}
              </Div>
            );
          }
        })}
      </Stack>
      {sidebarTheme?.sidebar &&
        Object.keys(sidebarTheme?.sidebar).length > 0 && (
          <React.Fragment>
            <Typography variant={"h6"} mb={2}>
              Background Image
            </Typography>
            <ImageList sx={{ m: 0, mb: 3 }} cols={5} gap={10}>
              {bgImageOptions.map((option) => {
                return (
                  <ImageListItem
                    sx={{
                      cursor: "pointer",
                    }}
                    key={option.name}
                    onClick={() => handleBgSelectionChange(option)}
                  >
                    <img
                      src={`${option.thumb}?w=98&fit=crop&auto=format`}
                      srcSet={`${option.thumb}?w=98fit=crop&auto=format&dpr=2 2x`}
                      alt={option.name}
                      loading="lazy"
                    />
                    {activeBgImage?.name === option.name && (
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            sx={{
                              color: "#4caf50",
                            }}
                            aria-label={`info about ${option.name}`}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        }
                        sx={{
                          top: 0,
                          justifyContent: "center",
                          backgroundColor: "transparent",
                          "& .MuiImageListItemBar-titleWrap": {
                            display: "none",
                          },
                        }}
                      />
                    )}
                  </ImageListItem>
                );
              })}
            </ImageList>
          </React.Fragment>
        )}

      <Button
        variant={"contained"}
        onClick={() => {
          setActiveBgColorOption(null);
          setActiveBgImage(null);
          setSidebarTheme({
            ...sidebarTheme,
            ...(theme.type === "dark" ? { ...darkTheme } : { ...defaultTheme }),
            sidebar: {},
          });
        }}
        disableElevation
        sx={{
          py: 0.5,
          fontSize: 13,
          letterSpacing: 1,
          textTransform: "none",
        }}
      >
        Reset Background
      </Button>
    </CustomizerCard>
  );
};
