import {
  Card,
  CardContent,
  CardHeader,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { FeaturesList } from "../FeaturesList";

type PricingPlanType = {
  title: React.ReactNode;
  subheader: React.ReactNode;
  children: React.ReactNode;
  headerSx: SxProps<Theme>;
  sx?: SxProps<Theme>;
};

const PricePlanItem = ({
  title,
  subheader,
  children,
  headerSx,
  sx,
}: PricingPlanType) => {
  return (
    <Card
      sx={{
        transform: "scale(.95)",
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "scale(1)",
        },
        ...sx,
      }}
    >
      <CardHeader
        title={
          typeof title === "string" ? (
            <Typography
              variant={"h2"}
              fontSize={36}
              fontWeight={500}
              color="inherit"
            >
              {title}
            </Typography>
          ) : (
            title
          )
        }
        subheader={
          typeof subheader === "string" ? (
            <Typography
              variant={"h5"}
              color="inherit"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 3,
                mb: 0,
              }}
            >
              {subheader}
            </Typography>
          ) : (
            subheader
          )
        }
        sx={{
          py: 5,
          color: "common.white",
          ...headerSx,
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 5,
        }}
      >
        <FeaturesList />
        {children}
      </CardContent>
    </Card>
  );
};

export { PricePlanItem };
