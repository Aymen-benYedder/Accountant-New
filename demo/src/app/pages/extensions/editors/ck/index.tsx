import { CkEditorWrapper } from "@app/_components/extensions/editors/ck";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function CkEditorPage() {
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
      <Typography variant={"h1"} sx={{ mb: 3 }}>
        {t("extensions.title.ckEditor")}
      </Typography>
      <CkEditorWrapper />
    </Container>
  );
}
