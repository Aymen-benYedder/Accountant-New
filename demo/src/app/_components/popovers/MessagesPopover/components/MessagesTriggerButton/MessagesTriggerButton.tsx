import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import { useJumboHeaderTheme } from "@jumbo/components/JumboTheme/hooks";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ThemeProvider } from "@mui/material";
import { useWebSocket } from "../../../../../../contexts/WebSocketContext"; // Import useWebSocket

const MessagesTriggerButton = () => {
  const { headerTheme } = useJumboHeaderTheme();
  const { unreadMessageCount } = useWebSocket(); // Get unreadMessageCount from context

  return (
    <ThemeProvider theme={headerTheme}>
      <JumboIconButton
        badge={unreadMessageCount > 0 ? { variant: "dot" } : undefined} // Conditionally render badge
        elevation={23}
      >
        <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "1rem" }} />
      </JumboIconButton>
    </ThemeProvider>
  );
};

export { MessagesTriggerButton };
