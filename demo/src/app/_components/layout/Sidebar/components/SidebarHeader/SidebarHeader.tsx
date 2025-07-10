import { Logo } from "@app/_components/_core";
import {
  useJumboLayout,
  useSidebarState,
} from "@jumbo/components/JumboLayout/hooks";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { SIDEBAR_VIEWS } from "@jumbo/utilities/constants";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton, Zoom } from "@mui/material";
import React from "react";
import { SidebarHeaderDiv } from "../SidebarHeaderDiv";

function SidebarHeader() {
  const { sidebarOptions, setSidebarOptions } = useJumboLayout();
  const { theme } = useJumboTheme();
  const { isMiniAndClosed } = useSidebarState();
  const miniAndClosed = isMiniAndClosed();

  function handleMenuToggle() {
    setSidebarOptions({ open: false });
  }
  return (
    <React.Fragment>
      <SidebarHeaderDiv>
        <Logo mini={miniAndClosed} mode={theme.type} />
        {sidebarOptions?.view !== SIDEBAR_VIEWS.MINI && (
          <Zoom in={sidebarOptions?.open}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 0, mr: -1.5 }}
              onClick={handleMenuToggle}
            >
              <MenuOpenIcon />
            </IconButton>
          </Zoom>
        )}
      </SidebarHeaderDiv>
    </React.Fragment>
  );
}

export { SidebarHeader };

