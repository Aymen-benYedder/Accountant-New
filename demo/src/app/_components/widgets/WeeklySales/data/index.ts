import { ASSET_IMAGES } from "@app/_utilities/constants/paths";

export type WeeklyProductType = {
    id: number;
    name: string;
    logo: string;
    colorCode: string;
    sales_data: {
        income: number;
        sold_qty: number;
        sales_inflation: number;
    }
};

export const productsList: WeeklyProductType[] = [
    {
        id: 1,
        name: 'Jumbo',
        logo: `${ASSET_IMAGES}/logos/project-logo-1.png`,
        colorCode: '#03DAC5',
        sales_data: {
            income: 182640,
            sold_qty: 250,
            sales_inflation: 100,
        },
    },
    {
        id: 2,
        name: 'React',
        logo: `${ASSET_IMAGES}/logos/project-logo-2.png`,
        colorCode: '#FF9F1C',
        sales_data: {
            income: 89070,
            sold_qty: 100,
            sales_inflation: 20,
        },
    },
    {
        id: 3,
        name: 'Flexile',
        logo: `${ASSET_IMAGES}/logos/project-logo-3.png`,
        colorCode: '#55DDE0',
        sales_data: {
            income: 35682,
            sold_qty: 450,
            sales_inflation: 120,
        },
    },
    {
        id: 4,
        name: 'Drift',
        logo: `${ASSET_IMAGES}/logos/project-logo-7.png`,
        colorCode: '#2BA444',
        sales_data: {
            income: 233807,
            sold_qty: 135,
            sales_inflation: -25,
        },
    },
    {
        id: 5,
        name: 'Wield',
        logo: `${ASSET_IMAGES}/logos/project-logo-8.png`,
        colorCode: '#EF8354',
        sales_data: {
            income: 398280,
            sold_qty: 1250,
            sales_inflation: 125,
        },
    },
    {
        id: 6,
        name: 'Apple',
        logo: `${ASSET_IMAGES}/logos/project-logo-6.png`,
        colorCode: '#ce93d8',
        sales_data: {
            income: 33782,
            sold_qty: 250,
            sales_inflation: 100,
        },
    },
    {
        id: 7,
        name: 'Oracle',
        logo: `${ASSET_IMAGES}/logos/project-logo-10.png`,
        colorCode: '#dce775',
        sales_data: {
            income: 956783,
            sold_qty: 100,
            sales_inflation: 20,
        },
    },
    {
        id: 8,
        name: 'eBook',
        logo: `${ASSET_IMAGES}/logos/project-logo-5.png`,
        colorCode: '#bdbdbd',
        sales_data: {
            income: 659874,
            sold_qty: 450,
            sales_inflation: 120,
        },
    },
];
