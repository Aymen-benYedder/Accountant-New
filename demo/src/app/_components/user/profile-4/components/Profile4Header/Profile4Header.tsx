import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import { Verified } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { RiSettings3Line } from "react-icons/ri";

const Profile4Header = () => {
  const { theme } = useJumboTheme();
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={4}
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignSelf: "flex-start",
        }}
      >
        <Badge
          overlap="circular"
          variant="dot"
          sx={{
            maxWidth: 90,
            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              border: 1,
              borderColor: "common.white",
              borderRadius: "50%",
              backgroundColor: "#72d63a",
              right: 3,
              top: 3,
            },
          }}
        >
          <Avatar
            alt={""}
            variant="square"
            sx={{ borderRadius: 4, width: "90px", height: "90px" }}
            src={`${ASSET_AVATARS}/avatar9.jpg`}
          />
        </Badge>
        <Box ml={2}>
          {/* Name and Status */}
          <Box display="flex" alignItems="center" mb={0.5} mt={1}>
            <Typography variant="h4" component="div" mb={0}>
              Brian Walsh
            </Typography>
            <Verified color="primary" sx={{ ml: 1, fontSize: 16 }} />
          </Box>
          <Typography variant="body1" mb={0.5}>
            Graphic Designer
          </Typography>
          <Chip
            color="success"
            label={"Open to work"}
            size={"small"}
            sx={{ textTransform: "uppercase", height: 18 }}
          />
        </Box>
      </Div>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            justifyContent: "space-between",
            mt: 2,
            width: "100%",
          },
        }}
      >
        <Button
          variant="contained"
          size="small"
          disableElevation
          sx={{
            borderRadius: 24,
            p: (theme) => theme.spacing(1, 2),
            textTransform: "none",
          }}
        >
          Get in touch
        </Button>
        <IconButton>
          <RiSettings3Line />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export { Profile4Header };
