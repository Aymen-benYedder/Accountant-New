import Timeline from '@mui/lab/Timeline';
import { Typography } from '@mui/material';
import React from 'react';
import { ScheduleItem } from '..';
import { scheduleData } from '../../data';

const ScheduleList = () => {
  return (
    <React.Fragment>
      <Typography variant={'h5'} color={'text.secondary'} mb={2}>
        {`Today's schedule`}
      </Typography>
      <Timeline
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {scheduleData.map((schedule, index) => {
          return <ScheduleItem item={schedule} key={index} />;
        })}
      </Timeline>
    </React.Fragment>
  );
};

export { ScheduleList };
