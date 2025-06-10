import { View } from "@app/_components/_core";
import {
  ProjectItem,
  ProjectType,
  projects,
} from "@app/_components/views/grid/Projects";
import { users } from "@app/_components/views/grid/Users/data";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProjectsGridPage() {
  const { t } = useTranslation();
  return (
    users.length > 0 && (
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
          variant="grid"
          dataSource={projects}
          renderItem={ProjectItem}
        />
      </Container>
    )
  );
}
