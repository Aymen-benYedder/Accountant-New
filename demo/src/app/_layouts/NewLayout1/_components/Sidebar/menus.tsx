import { ArrowBack } from '@mui/icons-material';

const locale = 'en-US';
export const sidebar = {
  menu: {
    home: 'Home',
    card: 'Card',
    misc: 'Misc',
    crypto: 'Crypto',
    widgets: 'Widgets',
    metrics: 'Metrics',
  },
  menuItem: {
    misc: 'Misc',
    crypto: 'Crypto',
    widgets: 'Widgets',
    metrics: 'Metrics',
  },
};
export const layout1Menus = [
  {
    label: sidebar.menu.home,
    children: [
      {
        path: `/${locale}/dashboards/misc`,
        label: sidebar.menuItem.misc,
        icon: 'misc',
      },
      {
        path: `/${locale}/dashboards/crypto`,
        label: sidebar.menuItem.crypto,
        icon: <ArrowBack />,
      },
    ],
  },

  {
    label: sidebar.menu.card,
    children: [
      {
        path: `/${locale}/widgets`,
        label: sidebar.menuItem.widgets,
        icon: 'widget',
      },
      {
        path: `/${locale}/metrics`,
        label: sidebar.menuItem.metrics,
        icon: 'metric',
      },
    ],
  },
];
