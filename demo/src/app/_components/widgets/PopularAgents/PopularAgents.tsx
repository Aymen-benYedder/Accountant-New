import { CardUserRating } from "@app/_components/cards/CardUserRating";
import { Avatar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { agents } from "./data";

const PopularAgents = ({ title }: { title: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Typography variant={"h4"} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={3.75}>
        {agents.map((agent, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <CardUserRating
              title={agent.name}
              avatar={
                <Avatar
                  alt={agent.name}
                  src={agent.avatar}
                  sx={{
                    boxShadow: 24,
                    width: 60,
                    height: 60,
                    mb: 2,
                    mt: "-54px",
                  }}
                />
              }
              rating={agent.rating}
              stats={[agent.desc]}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export { PopularAgents };
