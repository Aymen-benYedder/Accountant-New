import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

// Temporary interface for Client
interface Client {
  id: string;
  name: string;
  email: string;
}

// Temporary mock data
const mockClients: Client[] = [
  { id: '1', name: 'Client 1', email: 'client1@example.com' },
  { id: '2', name: 'Client 2', email: 'client2@example.com' },
];

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
      <List>
        {mockClients.map((client) => (
          <ListItem key={client.id}>
            <ListItemText primary={client.name} secondary={client.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}