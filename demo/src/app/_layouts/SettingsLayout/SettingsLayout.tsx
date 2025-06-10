import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Container, List } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { ContentLayout } from "../ContentLayout/ContentLayout";
import { NavSectionSettingItem } from "./NavSectionSettingItem";
import { NavSettingItem } from "./NavSettingItem";
import { getSettingMenus } from "./setting-menus-items";

const useSettingLayout = () => {
  const { theme } = useJumboTheme();
  return React.useMemo(
    () => ({
      sidebarOptions: {
        sx: {
          width: 240,
          display: "flex",
          minWidth: 0,
          flexShrink: 0,
          flexDirection: "column",
          mr: 4,
          [theme.breakpoints.up("lg")]: {
            position: "sticky",
            zIndex: 5,
            top: 112,
          },
          [theme.breakpoints.down("lg")]: {
            display: "none",
          },
        },
      },
      wrapperOptions: {
        sx: {
          alignItems: "flex-start",
        },
      },
      contentOptions: {
        sx: {
          p: { lg: 0, sm: 0, xs: 0 },
        },
      },
    }),
    [theme]
  );
};

export function SettingsLayout() {
  const menus = getSettingMenus();
  const settingsLayoutConfig = useSettingLayout();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <ContentLayout
        sidebar={
          menus?.length > 0 && (
            <List
              disablePadding
              sx={{
                pb: 2,
              }}
            >
              {menus?.map((item, index) => (
                <React.Fragment key={index}>
                  <NavSectionSettingItem
                    item={item}
                    key={index}
                    isFirstSection={true}
                    primary={index}
                  />
                  {item?.children?.map((item, index) => (
                    <NavSettingItem navItem={item} key={index} />
                  ))}
                </React.Fragment>
              ))}
            </List>
          )
        }
        {...settingsLayoutConfig}
      >
        <Outlet />
      </ContentLayout>
    </Container>
  );
}
