import { Div } from '@jumbo/shared';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';

import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { Button, CardActions, Divider, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { JumboDdPopover } from '@jumbo/components/JumboDdPopover';
import { useWebSocket } from '@contexts/WebSocketContext';
import TaskNotificationsTriggerButton from './components/TaskNotificationsTriggerButton/TaskNotificationsTriggerButton';
import TaskNotificationsList from './components/TaskNotificationsList/TaskNotificationsList';

const TaskNotificationsPopover = () => {
  const { theme } = useJumboTheme();
  const navigate = useNavigate();
  const { lastTaskNotification } = useWebSocket();
  
  // State to track if we've shown the notification
  const [shownNotifications, setShownNotifications] = React.useState<Set<string>>(new Set());
  
  // Effect to handle new task notifications
  React.useEffect(() => {
    if (lastTaskNotification && lastTaskNotification.task) {
      const notificationId = `${lastTaskNotification.task._id}-${lastTaskNotification.eventType}-${lastTaskNotification.timestamp}`;
      
      // Check if we've already shown this notification
      if (!shownNotifications.has(notificationId)) {
        // Add to shown notifications
        setShownNotifications(prev => new Set(prev).add(notificationId));
        
        // Show a snackbar notification
        const event = new CustomEvent('showSnackbar', {
          detail: {
            message: `Task "${lastTaskNotification.task.title}" has been ${lastTaskNotification.eventType}`,
            variant: 'info',
            autoHideDuration: 5000
          }
        });
        window.dispatchEvent(event);
      }
    }
  }, [lastTaskNotification, shownNotifications]);
  
  const handleViewAll = () => {
    // Navigate to tasks page based on user role
    // For now, we'll navigate to the main tasks page
    navigate("/apps/tasks");
  };
  
  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover triggerButton={<TaskNotificationsTriggerButton />}>
        <Div sx={{ width: 360, maxWidth: '100%' }}>
          <Div 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              pb: 1
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
              Task Notifications
            </h3>
          </Div>
          <TaskNotificationsList />
          <Divider />
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              sx={{
                textTransform: 'none',
                fontWeight: 'normal',
                '&:hover': { bgcolor: 'transparent' },
              }}
              size={'small'}
              variant='text'
              endIcon={<ArrowForwardIcon />}
              disableRipple
              onClick={handleViewAll}
            >
              View All Tasks
            </Button>
          </CardActions>
        </Div>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export { TaskNotificationsPopover };