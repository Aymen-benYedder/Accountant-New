import {
  DzBasic,
  DzDisabled,
  DzPreviews,
  DzStyled,
  DzWithoutClick,
  DzWithoutDrag,
} from "@app/_components/extensions/dropzone";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function DropzonePage() {
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
      <Typography variant={"h1"} mb={3}>
        {t("extensions.title.dropzone")}
      </Typography>
      <Stack spacing={3}>
        <DzBasic />
        <DzPreviews />
        <DzStyled />
        <DzWithoutClick />
        <DzWithoutDrag />
        <DzDisabled />
      </Stack>
    </Container>
  );
}
