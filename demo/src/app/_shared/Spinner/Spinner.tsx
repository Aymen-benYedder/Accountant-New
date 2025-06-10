import { Div } from "@jumbo/shared";
import { CircularProgress, CssBaseline } from "@mui/material";

export const Spinner = () => {
  return (
    <>
      <CssBaseline />
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <CircularProgress sx={{ m: "-40px auto 0" }} />
      </Div>
    </>
  );
};
