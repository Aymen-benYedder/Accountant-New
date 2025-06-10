interface UserProps {
  id: number;
  name: string;
  profile_pic: string;
  status: string;
}
interface MessagesProps {
  senderId: any;
  id: number | string;
  _id?: string;
  message_type: string;
  message: string;
  content?: string; // Alias for message
  timestamp?: string | Date; // ISO string or Date object
  sent_at?: string; // Legacy timestamp
  sent_date?: string;
  unread: boolean;
  read?: boolean;
  sent_by: number;
  recipientId?: string | number;
  status?: string;
  taskId?: string;
}
interface ConversationProps {
  id: number;
  first_user_id: number;
  second_user_id: number;
  messages: MessagesProps[];
  contact?: UserProps;
  last_message?: MessagesProps;
}

export { type UserProps, type ConversationProps, type MessagesProps };
