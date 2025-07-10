export type MarketingCampaignItemType = {
  id: number;
  name: string;
  desc: string;
  icon: string;
  bgcolor: string;
  budget: number;
  growth: number;
};

export const marketingCampaigns: MarketingCampaignItemType[] = [
  {
    id: 1,
    name: 'Facebook Ads',
    desc: '63 Likes, 387 Shares',
    icon: 'facebook-outlined',
    bgcolor: '#38529A',
    budget: 570,
    growth: 20,
  },

  {
    id: 2,
    name: 'Twitter Ads',
    desc: '43 Likes, 545 Shares',
    icon: 'twitter',
    bgcolor: '#17A9FC',
    budget: 811,
    growth: -5,
  },

  {
    id: 3,
    name: 'Instagram',
    desc: '83 Follows, 79 Likes',
    icon: 'instagram',
    bgcolor: '#CC4BB7',
    budget: 685,
    growth: 20,
  },

  {
    id: 4,
    name: 'Google Ads',
    desc: '63 Likes, 387 Shares',
    icon: 'google',
    bgcolor: '#4181ED',
    budget: 685,
    growth: 145,
  },
  {
    id: 5,
    name: 'Youtube',
    desc: '70 Likes, 1387 Shares',
    icon: 'youtube',
    bgcolor: '#C6171D',
    budget: 375,
    growth: 55,
  },
  {
    id: 6,
    name: 'Linked In',
    desc: '85 Likes, 581 Shares',
    icon: 'linkedin',
    bgcolor: '#0073B1',
    budget: 410,
    growth: 70,
  },
];
