import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const TaskNotificationsTriggerButton: React.FC = () => {
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);

  // Simulate fetching notifications count
  React.useEffect(() => {
    // Fetch notifications count from WebSocket or API
    // For now, we'll just set a static count
    setNotificationsCount(3);
  }, []);

  return (
    <Badge badgeContent={notificationsCount} color="secondary">
      <IconButton aria-label="show notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  );
};

export default TaskNotificationsTriggerButton;