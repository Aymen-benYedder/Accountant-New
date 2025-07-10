import React from "react";
import { Div } from "@jumbo/shared";
import api from "@app/_utilities/api";
import { Collapse, Typography } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { ConversationItem } from "../ConversationItem";

// JWT util (copied for favorite conversations)
function getCurrentUserJwt(): { userId: string | null, role: string | null } {
  const token = localStorage.getItem('token');
  if (!token) return { userId: null, role: null };
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded && decoded.id ? decoded.id : (decoded._id ? decoded._id : null),
      role: decoded && decoded.role ? decoded.role : null
    };
  } catch {
    return { userId: null, role: null };
  }
}

const FavoriteConversationsList = () => {
  const [conversations, setConversations] = React.useState<any[]>([]);
  const { userId } = getCurrentUserJwt();

  React.useEffect(() => {
    async function fetchConversations() {
      // Show recent conversations as "favorites" for demo purposes
      if (!userId) return setConversations([]);
      // Get all messages where the user is sender or recipient, group by the other user
      const res = await api.get(`/messages?withUser=all`);
      const msgList = res.data || [];
      // Group messages into talks per counterpart user
      const convMap: Record<string, any> = {};
      msgList.forEach((m: any) => {
        // Use sent_by if available, fall back to senderId for backward compatibility
        const senderId = m.sent_by || m.senderId;
        const counterpart = senderId === userId ? m.recipientId : senderId;
        if (!convMap[counterpart]) {
          convMap[counterpart] = { userId: counterpart, messages: [] };
        }
        convMap[counterpart].messages.push(m);
      });
      setConversations(Object.values(convMap));
    }
    fetchConversations();
  }, [userId]);

  return (
    <React.Fragment>
      <Div
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: (theme) => theme.spacing(1.5, 2),
          bgcolor: (theme) => theme.palette.action.hover,
        }}
      >
        <Typography
          sx={{ letterSpacing: 1.5, textTransform: "uppercase" }}
          variant="h6"
          color="text.secondary"
          mb={0}
        >
          <small>Favorites</small>
        </Typography>
      </Div>
      <Div>
        <TransitionGroup>
          {conversations?.map((item, index) => (
            <Collapse key={index}>
              <ConversationItem conversationItem={item} />
            </Collapse>
          ))}
        </TransitionGroup>
      </Div>
    </React.Fragment>
  );
};

export { FavoriteConversationsList };
