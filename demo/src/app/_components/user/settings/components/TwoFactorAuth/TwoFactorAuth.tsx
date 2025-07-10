import { Alert, AlertTitle, Card, List, Typography } from "@mui/material";

import React from "react";
import { SettingHeader } from "../../SettingHeader";
import { TwoFactorAuthItem } from "./TwoFactorAuthItem";
import { FactoAuthData } from "./data";

const TwoFactorAuth = () => {
  return (
    <React.Fragment>
      <SettingHeader title={"2 Factor Auth"} divider sx={{ mb: 3 }} />
      <Alert
        severity="info"
        sx={{
          border: 1,
          borderColor: "info.main",
          alignItems: "center",
          borderRadius: 3,
          mb: 3.75,
          ".MuiAlert-icon": {
            fontSize: 26,
          },
        }}
      >
        <AlertTitle fontSize={18} mb={0}>
          Setup 2 Factor Authentication
        </AlertTitle>
        <Typography variant="body1" color={"text.primary"}>
          3 easy ways to configure 2 factor authentication for your account
        </Typography>
      </Alert>
      <Card>
        <List
          sx={{
            ".MuiListItem-container:not(:last-child)": {
              borderBottom: 1,
              borderColor: "divider",
            },
            ".MuiListItem-secondaryAction": { pr: 12 },
          }}
        >
          {FactoAuthData?.map((item, index) => (
            <TwoFactorAuthItem auth={item} key={index} />
          ))}
        </List>
      </Card>
    </React.Fragment>
  );
};

export { TwoFactorAuth };
