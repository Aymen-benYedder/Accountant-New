import { View } from "@app/_components/_core";
import { ClientItem, ClientProps, clients } from "@app/_components/views/list/Clients";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ClientsListPage() {
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
        {t("views.title.clients")}
      </Typography>
      <View<ClientProps>
        variant="list"
        dataSource={clients}
        renderItem={ClientItem}
      />
    </Container>
  );
}