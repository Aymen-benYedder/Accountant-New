import { ASSET_AVATARS } from "@app/_utilities/constants/paths";

export interface AuthorType {
    id: number;
    name: string;
    profile_pic: string;
    readers: string;
    articles: number;
}

export const popularAuthors: AuthorType[] = [
    {
        id: 1,
        name: 'Haylie Dorwart',
        profile_pic: `${ASSET_AVATARS}/avatar5.jpg`,
        readers: '500k+',
        articles: 45,
    },
    {
        id: 2,
        name: 'Rayna Schleifer',
        profile_pic: `${ASSET_AVATARS}/avatar3.jpg`,
        readers: '800k+',
        articles: 75,
    },
    {
        id: 3,
        name: 'Cristofer Herwitz',
        profile_pic: `${ASSET_AVATARS}/avatar7.jpg`,
        readers: '600k+',
        articles: 67,
    },
    {
        id: 4,
        name: 'Jenny Lee',
        profile_pic: `${ASSET_AVATARS}/avatar9.jpg`,
        readers: '500k+',
        articles: 87,
    },
    {
        id: 5,
        name: 'Jemas Dorwart',
        profile_pic: `${ASSET_AVATARS}/avatar11.jpg`,
        readers: '500k+',
        articles: 45,
    },
    {
        id: 6,
        name: 'Rayna Schleifer',
        profile_pic: `${ASSET_AVATARS}/avatar13.jpg`,
        readers: '800k+',
        articles: 75,
    },
];
