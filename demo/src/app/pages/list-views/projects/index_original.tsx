import { View } from "@app/_components/_core";
import {
  ProjectItem,
  ProjectType,
  projects,
} from "@app/_components/views/list/Projects";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProjectsListPage() {
  const { t } = useTranslation();
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
      <Typography variant={"h2"} mb={3}>
        {t("views.title.projects")}
      </Typography>
      <View<ProjectType>
        variant="list"
        dataSource={projects}
        renderItem={ProjectItem}
      />
    </Container>
  );
}
