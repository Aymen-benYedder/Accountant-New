import { Chip, Stack } from "@mui/material";
const Profile2Skill = () => {
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      sx={{
        "& > :not(style):not(style)": {
          mr: 1,
          mb: 1,
        },
      }}
    >
      <Chip label={"C++"} />
      <Chip label={"Java"} />
      <Chip label={"Full-Stack Development"} />
      <Chip label={"Mern"} />
    </Stack>
  );
};

export { Profile2Skill };
