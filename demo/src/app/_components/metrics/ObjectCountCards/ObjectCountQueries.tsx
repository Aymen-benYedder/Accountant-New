import { CardIconText } from "@jumbo/shared/components/CardIconText";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import { Typography } from "@mui/material";
import React from "react";

const ObjectCountQueries = ({ subTitle }: { subTitle: React.ReactNode }) => {
  return (
    <CardIconText
      icon={<ContactPhoneRoundedIcon fontSize="large" />}
      title={
        <Typography variant={"h4"} color={"warning.main"}>
          8,380
        </Typography>
      }
      subTitle={
        <Typography variant={"h6"} color={"text.secondary"}>
          {subTitle}
        </Typography>
      }
      color={"warning.main"}
      disableHoverEffect={true}
      hideArrow={true}
      variant={"outlined"}
    />
  );
};
export { ObjectCountQueries };
