import { Divider, Stack, Typography, styled } from "@mui/material";
import React from "react";

export type ProfileStatType = {
  count: number | string;
  label: string;
};

type ProfileStatsProps = {
  data: ProfileStatType[];
  divider?: boolean;
};

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ProfileStats({ data, divider = true }: ProfileStatsProps) {
  return (
    <React.Fragment>
      <Stack
        direction={"row"}
        justifyContent={"space-evenly"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        {data.map((item, index) => (
          <Item key={index}>
            <Typography variant={"h6"}>{item.count}</Typography>
            <Typography>{item.label}</Typography>
          </Item>
        ))}
      </Stack>
      {divider && <Divider />}
    </React.Fragment>
  );
}

export { ProfileStats };
