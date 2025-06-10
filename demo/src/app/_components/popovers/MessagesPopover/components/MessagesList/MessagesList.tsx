import List from '@mui/material/List';
import MessageItem from './MessageItem';
import api from '@app/_utilities/api';
import React from 'react';
import { MessagesDataProps } from './data';
import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";

const fallbackAvatar = getAssetPath(`${ASSET_AVATARS}/default-user.jpg`, "40x40");

function getCurrentUserJwt(): { userId: string | null } {
  const token = localStorage.getItem('token');
  if (!token) return { userId: null };
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return { userId: decoded && decoded.id ? decoded.id : (decoded._id ? decoded._id : null) };
  } catch {
    return { userId: null };
  }
}

const MessagesList = () => {
  const [items, setItems] = React.useState<MessagesDataProps[]>([]);
  const [userMap, setUserMap] = React.useState<Record<string, { name: string; profile_pic: string }>>({});

  React.useEffect(() => {
    const fetchMessages = async () => {
      const { userId } = getCurrentUserJwt();
      if (!userId) return;
      // Fetch all sent & received messages
      const res = await api.get(`/messages?withUser=all`);
      const msgs = res.data || [];

      // Find all unique other users in the result
      const userIds = new Set<string>();
      msgs.forEach((msg: any) => {
        const otherUser = msg.senderId === userId ? msg.recipientId : msg.senderId;
        userIds.add(otherUser);
      });

      // Fetch user info for each participant (batched, sequential for now)
      const map: Record<string, { name: string; profile_pic: string }> = {};
      await Promise.all(Array.from(userIds).map(async (uid) => {
        try {
          const res = await api.get(`/users/${uid}`);
          map[uid] = {
            name: res.data?.name || res.data?.fullName || res.data?.email || "Contact",
            profile_pic: fallbackAvatar
          };
        } catch {
          map[uid] = { name: "Contact", profile_pic: fallbackAvatar };
        }
      }));
      setUserMap(map);

      // Group by "other" user, keep only the latest message for each
      const convoMap = new Map<string, any>();
      msgs.forEach((msg: any) => {
        const otherUser = msg.senderId === userId ? msg.recipientId : msg.senderId;
        if (
          !convoMap.has(otherUser) ||
          new Date(msg.timestamp || msg.createdAt).getTime() > new Date(convoMap.get(otherUser).timestamp || convoMap.get(otherUser).createdAt).getTime()
        ) {
          convoMap.set(otherUser, msg);
        }
      });

      const mapped = Array.from(convoMap.values()).map((msg: any) => {
        const otherUser = msg.senderId === userId ? msg.recipientId : msg.senderId;
        return {
          user: {
            id: otherUser,
            name: userMap[otherUser]?.name || map[otherUser]?.name || "Contact",
            profile_pic: userMap[otherUser]?.profile_pic || map[otherUser]?.profile_pic || fallbackAvatar
          },
          message: msg.content,
          date: msg.timestamp || msg.createdAt || "",
        };
      });
      setItems(mapped);
    };

    fetchMessages();
  }, []);

  return (
    <List disablePadding>
      {items.map((item, index) => (
        <MessageItem item={item} key={index} />
      ))}
    </List>
  );
};

export { MessagesList };
