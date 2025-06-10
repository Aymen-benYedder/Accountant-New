import { JumboCard } from "@jumbo/components";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { NewSubscribersChart } from "./components";

const NewSubscribers = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={<StarIcon sx={{ color: "common.white" }} />}
      bgcolor={["#E44A77"]}
      sx={{ color: "common.white" }}
      contentWrapper
      contentSx={{ px: 3, pt: 0.5 }}
    >
      <Grid container columnSpacing={2} alignItems={"flex-end"}>
        <Grid size={6}>
          <Typography variant={"h2"} color={"common.white"}>
            85k+
          </Typography>
          <Typography variant={"h6"} color={"common.white"} mb={0}>
            {subheader}
          </Typography>
        </Grid>
        <Grid size={6}>
          <NewSubscribersChart />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { NewSubscribers };
