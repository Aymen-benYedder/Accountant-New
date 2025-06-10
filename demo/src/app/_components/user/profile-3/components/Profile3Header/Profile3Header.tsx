import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { JumboDdMenu } from "@jumbo/components";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div, Span } from "@jumbo/shared";
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
import { RiPencilLine } from "react-icons/ri";

const Profile3Header = () => {
  const { theme } = useJumboTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      mb={4}
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
        }}
      >
        <Badge
          overlap="circular"
          variant="dot"
          sx={{
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
          <Span sx={{ position: "absolute", zIndex: 1, bottom: -6, right: -6 }}>
            <IconButton
              aria-label="Edit"
              size="small"
              color="primary"
              sx={{
                border: 1,
                bgcolor: (theme) => theme.palette.background.paper,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.background.paper,
                },
              }}
            >
              <RiPencilLine fontSize="inherit" />
            </IconButton>
          </Span>
        </Badge>

        <Box ml={2}>
          {/* Name and Status */}

          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="h4" component="div" mb={0}>
              Brian Walsh
            </Typography>
            <Verified color="primary" sx={{ ml: 1, mr: 1, fontSize: 16 }} />
            <Chip
              size={"small"}
              color="success"
              label={"Open to work"}
              sx={{ textTransform: "uppercase", height: 18 }}
            />
          </Box>
          <Typography variant="body1" mb={0.5}>
            Active
          </Typography>
        </Box>
      </Div>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        sx={{
          [theme.breakpoints.down("md")]: {
            justifyContent: "space-between",
            mt: 2,
            width: "100%",
          },
        }}
      >
        <Div>
          <Button
            variant="outlined"
            size="small"
            sx={{
              p: (theme) => theme.spacing(1, 2),
              textTransform: "none",
            }}
          >
            See Public View
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              p: (theme) => theme.spacing(1, 2),
              textTransform: "none",
              ml: 2,
            }}
            disableElevation
          >
            Profile Setting
          </Button>
        </Div>
        <JumboDdMenu />
      </Stack>
    </Stack>
  );
};

export { Profile3Header };
