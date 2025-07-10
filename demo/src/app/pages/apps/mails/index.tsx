import {
  FilterDropdown,
  FolderDropdown,
  LabelDropdown,
  MailAppSidebar,
  MailDetail,
  MailFab,
  MailsList,
} from "@app/_components/apps/mails";
import PageHeader from "@app/_components/layout/Header/components/PageHeader/PageHeader";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ContentLayout } from "@app/_layouts";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Container, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const useMailLayout = () => {
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
const MailAppPage = () => {
  const mailLayoutConfig = useMailLayout();
  const { theme } = useJumboTheme();
  const { mailID } = useParams();
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
            title={"Mail App"}
            subheader={"A ready to integrate ui to build a mails module."}
          />
        }
        sidebar={<MailAppSidebar />}
        {...mailLayoutConfig}
      >
        {lg && (
          <Stack spacing={2} direction={"row"} sx={{ mb: 3, mt: -2 }}>
            <FolderDropdown />
            <FilterDropdown />
            <LabelDropdown />
            <MailFab />
          </Stack>
        )}
        {mailID ? <MailDetail /> : <MailsList />}
      </ContentLayout>
    </Container>
  );
};
export default MailAppPage;
