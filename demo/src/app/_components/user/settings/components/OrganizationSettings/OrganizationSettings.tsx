import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { RiAddFill } from "react-icons/ri";

import { AppPagination1 } from "@app/_components/common";
import { Div, Span } from "@jumbo/shared";
import AddIcon from "@mui/icons-material/Add";
import { SettingHeader } from "../../SettingHeader";
import { OrganizationCard, OrganizationsList } from "./components";
import { organinzationsData } from "./data";
const OrganizationSettings = () => {
  return (
    <>
      <SettingHeader
        title={"Organizations"}
        action={
          <>
            <Tooltip
              title="New Organization"
              placement="top"
              sx={{ display: { md: "none" } }}
            >
              <IconButton color="primary" size="small">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                boxShadow: "none",
                display: { xs: "none", md: "inline-flex" },
              }}
              startIcon={<RiAddFill />}
            >
              New Organization
            </Button>
          </>
        }
        divider
      />
      {/** Organizations Card */}
      <OrganizationCard />

      {/** Organizations Table or List */}
      <Div sx={{ mb: 3 }}>
        <OrganizationsList />
      </Div>
      <Stack direction={"row"} justifyContent={"space-between"} sx={{ mx: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Showing <Span sx={{ color: "text.primary" }}>1</Span> of{" "}
          <Span sx={{ color: "text.primary" }}>
            {organinzationsData?.length}
          </Span>
        </Typography>
        <AppPagination1 data={organinzationsData} limit={3} />
      </Stack>
    </>
  );
};

export { OrganizationSettings };
