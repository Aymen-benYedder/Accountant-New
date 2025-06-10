import { Div } from "@jumbo/shared";
import {
  alpha,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const SortedWithFilter = ({ data }: any) => {
  const [value, setValue] = React.useState("");
  return (
    <Div
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        p: (theme) => theme.spacing(0.75, 1, 0.75, 1.75),
        backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textTransform: "uppercase",
          fontSize: 12,
          letterSpacing: 1.5,
          mr: 1.25,
        }}
      >
        SORT BY
      </Typography>
      <FormControl sx={{ minWidth: 90 }}>
        <Select
          size="small"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          displayEmpty
          sx={{
            borderRadius: 4,
            ".MuiSelect-select": {
              paddingBlock: 0.75,
            },
          }}
        >
          <MenuItem value="">Newest First</MenuItem>
          {data?.map((item: any, index: number) => (
            <MenuItem value={item.label} key={index}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Div>
  );
};

export { SortedWithFilter };
