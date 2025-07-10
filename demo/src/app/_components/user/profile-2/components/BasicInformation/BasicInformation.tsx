import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isFavorite?: boolean;
  companies?: string[];
  online?: boolean;
}

interface BasicInformationProps {
  user?: BackendUser | null;
  loading?: boolean;
  error?: string | null;
}

const BasicInformation = ({ user, loading, error }: BasicInformationProps) => {
  if (loading) {
    return (
      <Typography sx={{ mb: 2 }}>Loading user information...</Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
    );
  }

  if (user) {
    return (
      <List
        disablePadding
        sx={{
          display: "flex",
          minWidth: 0,
          flexWrap: "wrap",
          color: "text.secondary",
          borderBottom: 1,
          borderColor: "divider",
          mb: 3.75,
          pb: 2,
          ".MuiListItem-root": {
            pl: 0,
            py: 0.5,
            width: { xs: "100%", md: "50%" },
          },
          ".MuiListItemIcon-root": {
            color: "inherit",
            minWidth: 38,
          },
        }}
      >
        <ListItem>
          <ListItemIcon>
            <span role="img" aria-label="Name">👤</span>
          </ListItemIcon>
          <ListItemText
            primary="Name"
            secondary={<Typography fontWeight={700}>{user.name}</Typography>}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span role="img" aria-label="Email">✉️</span>
          </ListItemIcon>
          <ListItemText
            primary="Email"
            secondary={<Typography fontWeight={700}>{user.email}</Typography>}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <span role="img" aria-label="Role">🛡️</span>
          </ListItemIcon>
          <ListItemText
            primary="Role"
            secondary={<Typography fontWeight={700}>{user.role}</Typography>}
          />
        </ListItem>
      </List>
    );
  }

  // Fallback to demo/static info (original demo code)
  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        minWidth: 0,
        flexWrap: "wrap",
        color: "text.secondary",
        borderBottom: 1,
        borderColor: "divider",
        mb: 3.75,
        pb: 2,
        ".MuiListItem-root": {
          pl: 0,
          py: 0.5,
          width: { xs: "100%", md: "50%" },
        },
        ".MuiListItemIcon-root": {
          color: "inherit",
          minWidth: 38,
        },
      }}
    >
      {/* demo items */}
      <ListItem>
        <ListItemIcon>
          <span role="img" aria-label="Name">👤</span>
        </ListItemIcon>
        <ListItemText primary="Name" secondary="Demo User" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <span role="img" aria-label="Email">✉️</span>
        </ListItemIcon>
        <ListItemText primary="Email" secondary="demo@example.com" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <span role="img" aria-label="Role">🛡️</span>
        </ListItemIcon>
        <ListItemText primary="Role" secondary="user" />
      </ListItem>
    </List>
  );
};

export default BasicInformation;
