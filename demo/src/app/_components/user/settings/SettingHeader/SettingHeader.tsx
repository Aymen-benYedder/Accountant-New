import { Div } from "@jumbo/shared";
import { Stack, SxProps, Theme, Typography } from "@mui/material";

import React from "react";
import { SettingOptionsWithGroup } from "../SettingOptionsWithGroup";

interface SettingHeaderProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  sx?: SxProps<Theme>;
}
const SettingHeader = ({ title, action, sx = {} }: SettingHeaderProps) => {
  return (
    <Div sx={{ borderBottom: 1, borderColor: "divider", py: 1, mb: 3, ...sx }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <>
          <Div sx={{ display: { lg: "none" } }}>
            <SettingOptionsWithGroup />
          </Div>
          <Div sx={{ display: { xs: "none", lg: "block" } }}>
            {typeof title === "string" ? (
              <Typography variant="h3" sx={{ my: 1 }}>
                {title}
              </Typography>
            ) : (
              title
            )}
          </Div>
        </>
        {action && action}
      </Stack>
    </Div>
  );
};
export { SettingHeader };
