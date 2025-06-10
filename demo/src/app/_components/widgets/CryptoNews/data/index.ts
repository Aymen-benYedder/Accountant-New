import { ASSET_IMAGES } from '@app/_utilities/constants/paths';

export type CryptoNewsType = {
  id: number;
  category: string;
  isTrending: boolean;
  image: string;
  title: string;
  description: string;
  fullDescription: string;
  author: {
    id: number;
    name: string;
  };
  views: number;
  tags: string[];
  publishDate: string;
  favorite: boolean;
};

export const cryptoNews: CryptoNewsType[] = [
  {
    id: 1,
    category: 'bitcoin',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto1.jpg`,
    title: 'Things to know about bitcoin',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    author: { id: 1, name: 'Julia T' },
    views: 203,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '26 June 2020',
    favorite: true,
  },
  {
    id: 2,
    category: 'ripple',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto2.jpg`,
    title: 'Getting started with Ripple',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 2, name: 'John Tull' },
    views: 233,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '25 June 2020',
    favorite: false,
  },
  {
    id: 3,
    category: 'litecoin',
    isTrending: false,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto3.jpg`,
    title: 'Is litecoin worth buying?',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 3, name: 'Amanda' },
    views: 303,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '24 June 2020',
    favorite: true,
  },
  {
    id: 4,
    category: 'bitcoin',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/bitcoin.jpg`,
    title: 'What is bitcoin, 20 things about bitcoin.',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 4, name: 'Shane' },
    views: 453,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '23 June 2020',
    favorite: false,
  },
  {
    id: 5,
    category: 'ripple',
    isTrending: false,
    image: `${ASSET_IMAGES}/dashboard/crypto/bitcoin-mousetrap.jpg`,
    title: '10 things you must know about Ripple',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,

    author: { id: 5, name: 'Dhruva' },
    views: 753,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '22 June 2020',
    favorite: true,
  },
  {
    id: 6,
    category: 'litecoin',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/blockchain.jpg`,
    title: 'Why litecoin can be the best cryptocurrency.',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 6, name: 'Krishna' },
    views: 535,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '21 June 2020',
    favorite: false,
  },
  {
    id: 7,
    category: 'bitcoin',
    isTrending: false,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto3.jpg`,
    title: 'Bitcoin- Hottest cryptocurrency ever',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 7, name: 'Rama' },
    views: 534,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '20 June 2020',
    favorite: true,
  },
  {
    id: 8,
    category: 'ripple',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto1.jpg`,
    title: 'Price and inside details of Ripple',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 8, name: 'Shaurya' },
    views: 873,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '19 June 2020',
    favorite: false,
  },
  {
    id: 9,
    category: 'litecoin',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto1.jpg`,
    title: 'The journey of Litecoin',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 10, name: 'Kushal' },
    views: 985,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '18 June 2020',
    favorite: true,
  },
  {
    id: 10,
    category: 'bitcoin',
    isTrending: false,
    image: `${ASSET_IMAGES}/dashboard/crypto/bitcoin-mousetrap.jpg`,
    title: 'Steps to invest in Bitcoin',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 10, name: 'Siddharth' },
    views: 345,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '17 June 2020',
    favorite: false,
  },
  {
    id: 11,
    category: 'ripple',
    isTrending: false,
    image: `${ASSET_IMAGES}/dashboard/crypto/blockchain.jpg`,
    title: 'Ripple -  is it worth to invest in it?',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,

    author: { id: 11, name: 'Varun' },
    views: 533,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '16 June 2020',
    favorite: true,
  },
  {
    id: 12,
    category: 'litecoin',
    isTrending: true,
    image: `${ASSET_IMAGES}/dashboard/crypto/crypto2.jpg`,
    title: 'Litecoin - Pros and cons of buying it',
    description:
      'Cras tincidunt sit amet massa at accumsan. Mauris tincidunt tincidunt est, et pulvinar felis pharetra in vestibulum sed.',
    fullDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.`,
    author: { id: 12, name: 'Vishnu' },
    views: 665,
    tags: ['BTC', 'Crypto', 'Trading', 'Tips', 'Cryptocurrency'],
    publishDate: '15 June 2020',
    favorite: false,
  },
];

export type NewsCategoryType = {
  id: number;
  name: string;
  slug: string;
};

export const newsCategories = [
  { id: 1, name: 'All', slug: 'all' },
  { id: 2, name: 'Bitcoin', slug: 'bitcoin' },
  { id: 3, name: 'Ripple', slug: 'ripple' },
  { id: 4, name: 'Litecoin', slug: 'litecoin' },
];
