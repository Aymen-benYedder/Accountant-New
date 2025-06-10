import { ASSET_IMAGES } from '@app/_utilities/constants/paths';

export type PostItemType = {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
};

export const latestPosts: PostItemType[] = [
  {
    id: 1,
    image: `${ASSET_IMAGES}/widgets/todd-quackenbush.jpg`,
    title: '5 DIY tips to use in kitchen',
    description:
      'Proin nec fringilla enim, in cursus est. Nam eget laoreet erat suscipit.',
    date: '25 Jan, 2021',
  },
  {
    id: 2,
    image: `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
    title: 'Top 5 beaches in the world',
    description:
      'Etiam sodales ut tortor ut dignissim. Curabitur dolor tortor.',
    date: '24 Feb, 2021',
  },
  {
    id: 3,
    image: `${ASSET_IMAGES}/widgets/designecologist.jpg`,
    title: '7 trends for copywriting in 2022',
    description: 'We’ve all seen a Mason jar with chalkboard paint.',
    date: '15 Mar, 2021',
  },
  {
    id: 4,
    image: `${ASSET_IMAGES}/widgets/matthias-wagner.jpg`,
    title: 'The story behind the best speech',
    description: 'This pegboard idea from Ninemsn Homes.',
    date: '24 May, 2021',
  },
  {
    id: 5,
    image: `${ASSET_IMAGES}/widgets/anas-alhajj.jpg`,
    title: 'The big bang theory is back to action',
    description: 'So whether you are heading out to enjoy the falling snow.',
    date: '27 Aug, 2021',
  },
  {
    id: 6,
    image: `${ASSET_IMAGES}/widgets/gemma-evans.jpg`,
    title: 'Flowers which keep you healthy',
    description:
      'Aenean imperdiet lobortis purus, eu suscipit ipsum pharetra ac.',
    date: '27 Nov, 2021',
  },
];
