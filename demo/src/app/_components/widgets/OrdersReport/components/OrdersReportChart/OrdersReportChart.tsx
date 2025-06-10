import { Div } from '@jumbo/shared';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import List from '@mui/material/List';
import {
  Legend,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { Props } from 'recharts/types/component/DefaultLegendContent';
import { orderReportsData } from '../../data';

const ListItemInline = styled(ListItem)(({ theme }) => ({
  width: 'auto',
  display: 'inline-flex',
  padding: theme.spacing(0, 0.5),
}));

const renderLegend = (props: Props): React.ReactNode => {
  const { payload } = props;

  return (
    <List
      disablePadding
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        minWidth: 0,
      }}
    >
      {payload?.map((entry, index) => {
        return (
          <ListItemInline key={`item-${index}`}>
            <ListItemIcon sx={{ minWidth: 16 }}>
              <FiberManualRecordIcon
                sx={{ color: entry.color, fontSize: '14px' }}
              />
            </ListItemIcon>
            <ListItemText primary={entry.value} />
          </ListItemInline>
        );
      })}
    </List>
  );
};

const OrdersReportChart = ({ height }: { height?: number }) => {
  return (
    <Div sx={{ pb: 3 }}>
      <ResponsiveContainer height={height ? height : 250}>
        <RadarChart
          cx='50%'
          cy='50%'
          outerRadius='100%'
          data={orderReportsData}
        >
          ​
          <defs>
            <filter id='f1' x='0' y='0' width='150%' height='150%'>
              <feGaussianBlur in='SourceAlpha' stdDeviation='4' />
              <feOffset dx='2' dy='4' />
              <feMerge>
                <feMergeNode />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>
          <PolarGrid />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name='Ordered'
            dataKey='B'
            stroke='#3f51b5'
            filter='url(#f1)'
            fill='#3f51b5'
          />
          <Radar
            name='Pending'
            dataKey='A'
            stroke='#ec407a'
            filter='url(#f1)'
            fill='#ec407a'
          />
          <Legend
            content={renderLegend}
            wrapperStyle={{ position: 'absolute', bottom: -24 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Div>
  );
};

export { OrdersReportChart };
