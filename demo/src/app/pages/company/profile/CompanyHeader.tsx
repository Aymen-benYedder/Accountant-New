import { JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Avatar, Badge, Button, Stack, Typography } from "@mui/material";
import React from "react";

interface CompanyHeaderProps {
  logo?: string;
  name?: string;
  tin?: string;
  onEdit?: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ logo, name, tin, onEdit }) => {
  let avatarSrc = logo && logo.trim() !== ""
    ? (logo.startsWith("http")
      ? logo
      : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}${logo}`)
    : "/assets/images/logos/project-logo-1.png";

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        pb: 3,
      }}
      mb={2.5}
    >
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          mr: 2,
        }}
      >
        <Badge
          overlap="circular"
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              border: 1,
              borderColor: "common.white",
              borderRadius: "50%",
              backgroundColor: "#72d63a",
              right: 2,
              top: 2,
            },
          }}
        >
          <Avatar
            alt={name || ""}
            variant="square"
            sx={{ borderRadius: 3, width: 60, height: 60 }}
            src={avatarSrc}
          />
        </Badge>
        <Div sx={{ flex: "1 1 auto", ml: 2 }}>
          <Typography variant={"h4"} textTransform={"capitalize"} mb={0.5}>
            {name || "Company"}
          </Typography>
          <Typography
            variant={"body2"}
            component={"span"}
            display={"block"}
            textTransform={"none"}
            sx={{ fontWeight: 500 }}
          >
            TIN: {tin || "--"}
          </Typography>
        </Div>
      </Div>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Button variant="outlined" size="small" onClick={onEdit}>
          Edit Company
        </Button>
        <JumboDdMenu />
      </Stack>
    </Stack>
  );
};

export default CompanyHeader;