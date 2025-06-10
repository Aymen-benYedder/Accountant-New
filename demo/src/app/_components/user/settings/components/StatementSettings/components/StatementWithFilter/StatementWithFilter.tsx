import { Div } from "@jumbo/shared";
import { alpha, IconButton, Stack, Typography } from "@mui/material";

import { SortedWithFilter } from "@app/_components/common";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { RiArrowDownSLine, RiFilterLine } from "react-icons/ri";

const StatementWithFilter = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap={2}
    >
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
          Period
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slots={{
              openPickerIcon: RiArrowDownSLine,
            }}
            format={"D MMM, YYYY"}
            slotProps={{ textField: { placeholder: "DD MM, YYYY" } }}
            sx={{
              ".MuiInputBase-root": {
                borderRadius: 6,
                width: 145,
              },
              ".MuiInputBase-input": {
                py: 0.75,
              },
              ".MuiIconButton-root": {
                p: 0.5,
              },
            }}
          />
        </LocalizationProvider>
        <Typography variant="body1" mx={1}>
          to
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slots={{
              openPickerIcon: RiArrowDownSLine,
            }}
            format={"D MMM, YYYY"}
            slotProps={{ textField: { placeholder: "DD MM, YYYY" } }}
            sx={{
              ".MuiInputBase-root": {
                borderRadius: 6,
                width: 145,
              },
              ".MuiInputBase-input": {
                py: 0.75,
              },
              ".MuiIconButton-root": {
                p: 0.5,
              },
            }}
          />
        </LocalizationProvider>
      </Div>
      <Div sx={{ display: "flex", minWidth: 0, alignItems: "center", gap: 1 }}>
        <SortedWithFilter data={[{ label: "Owner" }, { label: "Admin" }]} />
        <IconButton
          sx={{
            border: 1,
            borderRadius: 1.5,
            fontSize: 18,
            display: { xs: "none", md: "inline-flex" },
          }}
          color="primary"
        >
          <RiFilterLine />
        </IconButton>
      </Div>
    </Stack>
  );
};

export { StatementWithFilter };
