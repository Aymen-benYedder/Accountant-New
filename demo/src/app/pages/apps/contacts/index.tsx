import React from "react";

import {
  ContactFab,
  ContactsAppSidebar,
  ContactsList,
  FolderDropdown,
  LabelDropdown,
} from "@app/_components/apps/contacts";
import PageHeader from "@app/_components/layout/Header/components/PageHeader/PageHeader";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ContentLayout } from "@app/_layouts";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Container, Stack, useMediaQuery } from "@mui/material";

const useContactLayout = () => {
  const { theme } = useJumboTheme();
  return React.useMemo(
    () => ({
      sidebarOptions: {
        sx: {
          width: 200,
          display: "flex",
          minWidth: 0,
          flexShrink: 0,
          flexDirection: "column",
          mr: 3,
          [theme.breakpoints.up("lg")]: {
            position: "sticky",
            zIndex: 5,
            top: 96,
          },
          [theme.breakpoints.down("lg")]: {
            display: "none",
          },
        },
      },
      wrapperOptions: {
        sx: {
          alignItems: "flex-start",
        },
      },
      contentOptions: {
        sx: {
          p: { lg: 0, sm: 0, xs: 0 },
        },
      },
    }),
    [theme]
  );
};
const ContactAppPage = () => {
  const contactLayoutConfig = useContactLayout();
  const { theme } = useJumboTheme();
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <ContentLayout
        header={
          <PageHeader
            title={"Contacts"}
            subheader={"A ready to integrate ui to build a contacts module."}
          />
        }
        sidebar={<ContactsAppSidebar />}
        {...contactLayoutConfig}
      >
        {lg && (
          <Stack spacing={2} direction={"row"} sx={{ mb: 3, mt: -2 }}>
            <FolderDropdown />
            <LabelDropdown />
            <ContactFab />
          </Stack>
        )}
        <ContactsList />
      </ContentLayout>
    </Container>
  );
};
export default ContactAppPage;
