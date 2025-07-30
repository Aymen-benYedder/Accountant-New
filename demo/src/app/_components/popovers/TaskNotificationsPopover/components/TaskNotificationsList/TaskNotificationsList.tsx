import React from 'react';
import { useWebSocket, WebSocketContextType, TaskNotification } from '@contexts/WebSocketContext';

const TaskNotificationsList: React.FC = () => {
  const { taskNotifications } = useWebSocket() as WebSocketContextType;

  return (
    <div>
      {taskNotifications.map((notification: TaskNotification, index: number) => (
        <div key={index} style={{ padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskNotificationsList;