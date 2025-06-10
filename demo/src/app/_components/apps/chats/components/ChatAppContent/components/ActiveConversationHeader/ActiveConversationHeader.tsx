
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { JumboDdMenu } from "@jumbo/components";

interface ActiveConversationHeaderProps {
  activeConversation: any;
  hasUnreadMessages?: boolean;
}

const ActiveConversationHeader = ({ activeConversation, hasUnreadMessages = false }: ActiveConversationHeaderProps) => {
  const navigate = useNavigate();
  const { theme } = useJumboTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const handleCloseConversation = () => {
    navigate(`/apps/chat`);
  };
  if (!activeConversation) return null;
  return (
    <Div
      sx={{
        display: "flex",
        minWidth: 0,
        alignItems: "center",
        borderBottom: 1,
        borderBottomColor: "divider",
        p: (theme) => theme.spacing(2, 3),
      }}
    >
      {md && (
        <IconButton
          aria-label="Previous"
          sx={{ mr: 2 }}
          onClick={handleCloseConversation}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          flex: 1,
          mr: 2,
        }}
      >
        <Avatar
          alt={""}
          src={activeConversation?.contact?.profile_pic}
          sx={{ mr: 2 }}
        />
        <Div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant={"h5"} mb={0.5}>
              {activeConversation?.contact?.name}
              <StarOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  verticalAlign: "middle",
                  fontSize: 20,
                  ml: 1,
                  mt: "-4px",
                }}
              />
            </Typography>
            {hasUnreadMessages && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'warning.main',
                  ml: 0.5
                }}
              />
            )}
          </Box>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ textTransform: "capitalize" }}
          >
            <Badge
              overlap="circular"
              variant="dot"
              sx={{
                m: (theme) => theme.spacing(-0.25, 2, 0, 1),

                "& .MuiBadge-badge": {
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    activeConversation?.contact?.online === true
                      ? "#44b700"
                      : "#afa8a8",
                },
              }}
            />
            {activeConversation?.contact?.status}
          </Typography>
        </Div>
      </Div>
      <JumboDdMenu
        menuItems={[
          { title: "View Profile", slug: "view-profile" },
          { title: "Block", slug: "block" },
        ]}
      />
    </Div>
  );
};

export { ActiveConversationHeader };
