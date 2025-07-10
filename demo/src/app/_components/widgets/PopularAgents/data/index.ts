import { ASSET_AVATARS } from '@app/_utilities/constants/paths';

type AgentType = {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  desc: string;
};

export const agents: AgentType[] = [
  {
    id: 1,
    avatar: `${ASSET_AVATARS}/avatar10.jpg`,
    name: 'Albert Hall',
    rating: 3.5,
    desc: '23 deals',
  },
  {
    id: 2,
    avatar: `${ASSET_AVATARS}/avatar6.jpg`,
    name: 'John Hall',
    rating: 3.5,
    desc: '23 deals',
  },
  {
    id: 3,
    avatar: `${ASSET_AVATARS}/avatar3.jpg`,
    name: 'Jackson Hall',
    rating: 3.5,
    desc: '23 deals',
  },
  {
    id: 4,
    avatar: `${ASSET_AVATARS}/avatar7.jpg`,
    name: 'Jonty Hall',
    rating: 3.5,
    desc: '23 deals',
  },
];
