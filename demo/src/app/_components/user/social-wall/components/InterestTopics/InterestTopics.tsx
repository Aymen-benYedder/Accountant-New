import { Div } from "@jumbo/shared";
import { Chip, Stack, Typography } from "@mui/material";

const InterestTopics = () => {
  return (
    <Div sx={{ mb: 4 }}>
      <Typography variant={"h4"} mb={2}>
        Interest
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{
          mx: "-4px",
          "& > :not(style)": {
            margin: "0 4px 8px",
          },
        }}
      >
        <Chip label="Logo design" variant="outlined" />
        <Chip label="UI design" variant="outlined" />
        <Chip label="HTML" variant="outlined" />
        <Chip label="JavaScript" variant="outlined" />
        <Chip label="React" variant="outlined" />
        <Chip label="Branding" variant="outlined" />
      </Stack>
    </Div>
  );
};

export { InterestTopics };
