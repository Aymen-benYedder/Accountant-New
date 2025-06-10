import { ASSET_IMAGES } from "@app/_utilities/constants/paths";

export type UserPhotoType = {
    id: number;
    photo_url: string;
    caption: string;
    thumb: string;
    size: number;
};

export const userPhotos: UserPhotoType[] = [
    {
        id: 1,
        photo_url: `${ASSET_IMAGES}/products/speaker.jpeg`,
        caption: 'Beauty with Beast',
        thumb: '',
        size: 2.5,
    },
    {
        id: 2,
        photo_url: `${ASSET_IMAGES}/products/laptop.jpeg`,
        caption: 'Nature Love',
        thumb: '',
        size: 2,
    },
    {
        id: 3,
        photo_url: `${ASSET_IMAGES}/products/trimmer.jpg`,
        caption: 'Forest',
        thumb: '',
        size: 3.5,
    },
    {
        id: 4,
        photo_url: `${ASSET_IMAGES}/products/travel-bag.jpg`,
        caption: 'Nature at its best',
        thumb: '',
        size: 5,
    },
    {
        id: 5,
        photo_url: `${ASSET_IMAGES}/products/microphone.jpeg`,
        caption: 'Sea House',
        thumb: '',
        size: 3.5,
    },
    {
        id: 6,
        photo_url: `${ASSET_IMAGES}/products/speaker.jpeg`,
        caption: 'Minimal',
        thumb: '',
        size: 4,
    },
    {
        id: 7,
        photo_url: `${ASSET_IMAGES}/products/watch.jpeg`,
        caption: 'Beauty with Beast',
        thumb: '',
        size: 2.5,
    },
    {
        id: 8,
        photo_url: `${ASSET_IMAGES}/products/led.jpeg`,
        caption: 'Nature Love',
        thumb: '',
        size: 2,
    },
    {
        id: 9,
        photo_url: `${ASSET_IMAGES}/products/iPhone.jpeg`,
        caption: 'Forest',
        thumb: '',
        size: 3.5,
    },
    {
        id: 10,
        photo_url: `${ASSET_IMAGES}/products/headphone.jpeg`,
        caption: 'Nature at its best',
        thumb: '',
        size: 5,
    },
    {
        id: 11,
        photo_url: `${ASSET_IMAGES}/products/iPhone.jpeg`,
        caption: 'Sea House',
        thumb: '',
        size: 3.5,
    },
    {
        id: 12,
        photo_url: `${ASSET_IMAGES}/products/speaker.jpeg`,
        caption: 'Minimal',
        thumb: '',
        size: 4,
    },
];
