import { ASSET_AVATARS } from "@app/_utilities/constants/paths";

export type CommentType = {
    id: number;
    user: {
        id: number;
        name: string;
        profile_pic: string;
    };
    postTitle: string;
    comment: string;
    date: string;
}

export const commentsList: CommentType[] = [
    {
        id: 1,
        user: {
            id: 22,
            name: 'Domnic Harris',
            profile_pic: `${ASSET_AVATARS}/avatar3.jpg`,
        },
        postTitle: '4 keys to make your business unique.',
        comment: 'Thank you for such a wonderful post. The content was outstanding.',
        date: "25 Oct, 2021",
    },
    {
        id: 2,
        user: {
            id: 22,
            name: 'Novac',
            profile_pic: `${ASSET_AVATARS}/avatar5.jpg`,
        },
        postTitle: '10 ways you can keep yourself safe from Corona.',
        comment: 'It is amazing, keep up the good work. You are doing good for the society.',
        date: "29 Oct, 2021",
    },
    {
        id: 3,
        user: {
            id: 22,
            name: 'Rahul',
            profile_pic: `${ASSET_AVATARS}/avatar7.jpg`,
        },
        postTitle: 'Peaceful Mind - The first requirement towards the success',
        comment: 'Thank you for such a wonderful post. The content was outstanding.',
        date: "29 Oct, 2021",
    },
    {
        id: 4,
        user: {
            id: 22,
            name: 'Federer',
            profile_pic: `${ASSET_AVATARS}/avatar9.jpg`,
        },
        postTitle: 'Work from home - Easy or Difficult?',
        comment: 'Haha this is funny, it actually tells the truth.',
        date: "18 Sep, 2021",
    },
    {
        id: 5,
        user: {
            id: 22,
            name: 'Francis',
            profile_pic: `${ASSET_AVATARS}/avatar11.jpg`,
        },
        postTitle: '4 keys to make your business unique.',
        comment: 'Thank you for such a wonderful post. The content was outstanding.',
        date: "12 Sep, 2021",
    },
    {
        id: 6,
        user: {
            id: 22,
            name: 'Andy Murray',
            profile_pic: `${ASSET_AVATARS}/avatar13.jpg`,
        },
        postTitle: '4 keys to make your business unique.',
        comment: 'Thank you for such a wonderful post. The content was outstanding.',
        date: "24 Aug, 2021",
    },
];
