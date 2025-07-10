import { IconButton, ImageListItemBar, useMediaQuery } from "@mui/material";
import React from "react";

import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { useJumboLayout } from "@jumbo/components/JumboLayout/hooks";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import {
  SIDEBAR_STYLES,
  SIDEBAR_VARIANTS,
  SIDEBAR_VIEWS,
} from "@jumbo/utilities/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CustomizerCard } from "../CustomizerCard";

const layouts = [
  {
    name: "Layout 1",
    slug: "layout-1",
    variant: SIDEBAR_VARIANTS.PERSISTENT,
    style: SIDEBAR_STYLES.FULL_HEIGHT,
    view: SIDEBAR_VIEWS.FULL,
    open: true,
  },
  {
    name: "Layout 2",
    slug: "layout-2",
    variant: SIDEBAR_VARIANTS.PERSISTENT,
    style: SIDEBAR_STYLES.CLIPPED_UNDER_HEADER,
    view: SIDEBAR_VIEWS.FULL,
    open: true,
  },
  {
    name: "Layout 3",
    slug: "layout-3",
    variant: SIDEBAR_VARIANTS.TEMPORARY,
    style: SIDEBAR_STYLES.FULL_HEIGHT,
    view: SIDEBAR_VIEWS.FULL,
    open: false,
  },
  {
    name: "Layout 4",
    slug: "layout-4",
    variant: SIDEBAR_VARIANTS.PERMANENT,
    view: SIDEBAR_VIEWS.MINI,
    style: SIDEBAR_STYLES.FULL_HEIGHT,
    open: false,
  },
];

export const LayoutOptions = () => {
  const { sidebarOptions, setSidebarOptions, setHeaderOptions, headerOptions } =
    useJumboLayout();
  const { theme } = useJumboTheme();
  const isNotMobile = useMediaQuery(
    theme.breakpoints.up(sidebarOptions?.drawerBreakpoint ?? "lg")
  );
  const handleSidebarChanges = React.useCallback(
    (layout: any) => {
      if (isNotMobile) {
        setSidebarOptions({
          variant: layout.variant,
          style: layout?.style,
          view: layout?.view,
          open: layout?.open,
        });
      }
      if (layout.slug === "layout-2" || theme.type === "dark") {
        setHeaderOptions({
          ...headerOptions,
          sx: { ...headerOptions.sx, boxShadow: 23 },
        });
      } else {
        setHeaderOptions({
          ...headerOptions,
          sx: { ...headerOptions.sx, boxShadow: "none" },
        });
      }
    },
    [isNotMobile]
  );

  return (
    <CustomizerCard title={"Layout Options"}>
      {!isNotMobile && (
        <Div sx={{ mb: 2, color: "red", fontWeight: 500 }}>
          This option only works if your screen size has width more than 1200px
        </Div>
      )}
      <ImageList sx={{ m: 0 }} cols={2} gap={20}>
        {layouts.map((layout, index) => {
          const selected =
            layout.variant === sidebarOptions.variant &&
            layout.style === sidebarOptions.style;
          const imageSrc = `${ASSET_IMAGES}/jumbo-customizer/layouts/${layout.slug}.png`;

          return (
            <ImageListItem
              key={`${index}-${layout.name}`}
              onClick={() => handleSidebarChanges(layout)}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={`${imageSrc}?w=98&fit=crop&auto=format`}
                srcSet={`${imageSrc}?w=98fit=crop&auto=format&dpr=2 2x`}
                alt={layout.slug}
                loading="lazy"
              />
              {selected && (
                <ImageListItemBar
                  actionIcon={
                    <IconButton
                      sx={{
                        color: "#4caf50",
                      }}
                      //   aria-label={`info about ${layout.label}`}
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
    </CustomizerCard>
  );
};
