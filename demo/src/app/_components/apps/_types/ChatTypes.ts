interface UserProps {
  id: number;
  name: string;
  profile_pic: string;
  status: string;
}
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error' | 'received';

interface MessagesProps {
  senderId?: any; // Made optional to match mock data
  id: number | string;
  _id?: string;
  message_type: string;
  message: string;
  content?: string; // Alias for message
  timestamp?: string | Date; // ISO string or Date object
  sent_at?: string | Date; // Can be either string or Date
  sent_date?: string | Date; // Can be either string or Date
  unread: boolean;
  read?: boolean;
  sent_by: number; // This is the actual field used in mock data
  recipientId?: string | number;
  status?: MessageStatus;
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
