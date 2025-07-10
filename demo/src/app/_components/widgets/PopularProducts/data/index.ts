import { ASSET_IMAGES } from '@app/_utilities/constants/paths';

export const menuItems = [
  {
    icon: null,
    title: 'View all',
    slug: 'all',
  },
  {
    icon: null,
    title: 'Bookmark',
    slug: 'bookmark',
  },
];
export type ProductType = {
  id: number;
  name: string;
  thumb: string;
  description: string;
  price: number;
  salePrice: number;
};
export const productsData: ProductType[] = [
  {
    id: 1001,
    name: 'The future of LED bulbs',
    thumb: `${ASSET_IMAGES}/products/maria-fatima.jpg`,
    description: 'Lorem ipsum is not simply random text',
    price: 250,
    salePrice: 200,
  },
  {
    id: 1002,
    name: 'The fitness watch',
    thumb: `${ASSET_IMAGES}/products/ivan-shilov.jpg`,
    description: 'Lorem ipsum is not simply random text',
    price: 299,
    salePrice: 275,
  },
  {
    id: 1003,
    name: 'Speakers - party time',
    thumb: `${ASSET_IMAGES}/products/omar-flores.jpg`,
    description: 'Lorem ipsum is not simply random text',
    price: 980,
    salePrice: 499,
  },
  {
    id: 1004,
    name: 'Study lamp',
    thumb: `${ASSET_IMAGES}/products/marcus-urbenz.jpg`,
    description: 'Lorem ipsum is not simply random text',
    price: 500,
    salePrice: 430,
  },
];
