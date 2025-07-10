import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React from "react";

const WordOfTheDay = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard
      sx={{
        "& .MuiCardHeader-action": {
          my: "-4px",
          mr: -1,
        },
      }}
      title={title}
      action={
        <IconButton>
          <SyncOutlinedIcon />
        </IconButton>
      }
    >
      <Div sx={{ p: 3, pt: 0 }}>
        <Typography variant={"h3"}>be-nev-o-lent</Typography>
        <Typography variant={"body1"} color={"text.secondary"} mb={2}>
          adjective
        </Typography>
        <Typography variant={"body1"} color={"text.secondary"} mb={4}>
          The definition of benevolent is enjoying helping others or someone
          whose characteristic is being friendly.
        </Typography>
        <Button
          variant={"contained"}
          sx={{
            minWidth: 24,
            p: (theme) => theme.spacing(0.75, 1.25),
            mb: 0.5,
          }}
        >
          <VolumeUpOutlinedIcon sx={{ fontSize: 22 }} />
        </Button>
      </Div>
    </JumboCard>
  );
};

export { WordOfTheDay };
