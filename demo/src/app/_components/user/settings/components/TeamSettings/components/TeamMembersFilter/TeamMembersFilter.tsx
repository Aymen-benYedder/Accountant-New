import { SearchPopover, SortedWithFilter } from "@app/_components/common";
import { Div } from "@jumbo/shared";
import { IconButton, Stack, Typography } from "@mui/material";
import { RiFilterLine } from "react-icons/ri";

const TeamMembersFilter = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={3}
      sx={{ px: 1, flexWrap: "wrap" }}
    >
      <Div sx={{ mr: 2 }}>
        <Typography variant="h4">Team Members</Typography>
        <Typography variant="body2" color={"text.secondary"}>
          7 active, 3 invited, 2 suspended
        </Typography>
      </Div>
      <Div sx={{ display: "flex", alignItems: "center", gap: 2, my: 1.5 }}>
        <SearchPopover placeholder="Enter name or email" sx={{ width: 240 }} />
        <SortedWithFilter data={[{ label: "Owner" }, { label: "Admin" }]} />
        <IconButton
          sx={{
            border: 1,
            borderRadius: 1.5,
            fontSize: 18,
            display: { xs: "none", xl: "inline-flex" },
          }}
          color="primary"
        >
          <RiFilterLine />
        </IconButton>
      </Div>
    </Stack>
  );
};

export { TeamMembersFilter };
