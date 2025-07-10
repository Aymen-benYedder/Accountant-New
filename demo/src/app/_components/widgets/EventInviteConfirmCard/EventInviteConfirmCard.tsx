import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { JumboCard } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import {
  CheckCircleOutline,
  Event,
  SentimentDissatisfiedSharp,
} from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from '@mui/material';
import React from 'react';

interface EventInviteConfirmCardProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}

interface EventAction {
  message: string;
  type: string;
  icon?: React.ReactNode;
}

export function EventInviteConfirmCard({
  title,
  subheader,
}: EventInviteConfirmCardProps) {
  const [action, setAction] = React.useState<EventAction>({
    message: '',
    type: '',
  });
  const [confirmation, setConfirmation] = React.useState('none');
  React.useEffect(() => {
    switch (confirmation) {
      case 'yes':
        setAction({
          type: 'success.main',
          message: 'Great! see you there at event.',
          icon: <CheckCircleOutline />,
        });
        break;
      case 'no':
        setAction({
          type: 'text.primary',
          message: 'Thanks for checking this out.',
          icon: <SentimentDissatisfiedSharp />,
        });
        break;
      case 'maybe':
        setAction({
          type: 'warning.main',
          message: 'Setup a reminder.',
          icon: <Event />,
        });
        break;
      default:
        setAction({ type: '', message: '' });
    }
  }, [confirmation]);

  return (
    <JumboCard title={title} subheader={subheader}>
      <CardMedia
        component='img'
        height='212'
        image={`${ASSET_IMAGES}/widgets/conference-poster.webp`}
        alt={''}
      />
      <CardContent>
        <Div sx={{ pb: 2 }}>
          <Typography variant={'body1'} mb={2}>
            Join the event to either explore the area of digital media marketing
            or learn more here.
          </Typography>
          <div>
            {
              <Collapse in={!!action.type}>
                <Typography
                  color={`${action.type}`}
                  sx={{
                    '& svg': {
                      verticalAlign: 'middle',
                      mr: 1,
                      mt: '-2px',
                    },
                  }}
                >
                  {action.icon}
                  {action.message}
                </Typography>
              </Collapse>
            }
          </div>
        </Div>
        <ButtonGroup>
          <Button onClick={() => setConfirmation('yes')}>Yes</Button>
          <Button onClick={() => setConfirmation('maybe')}>Maybe</Button>
          <Button onClick={() => setConfirmation('no')}>No</Button>
        </ButtonGroup>
      </CardContent>
    </JumboCard>
  );
}
