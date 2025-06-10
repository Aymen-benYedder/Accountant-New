import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
interface ProfileMediaProps {
  id: number;
  title: string;
  mediaImage: string;
  comments: string;
  likes: string;
  views: string;
}
const profileMediaData: ProfileMediaProps[] = [
  {
    id: 1,
    title: "Nature Photographs",
    mediaImage: `${ASSET_IMAGES}/profiles/nature.png`,
    comments: "0",
    likes: "2k",
    views: "1.5k",
  },
  {
    id: 2,
    title: "Skin Care Products",
    mediaImage: `${ASSET_IMAGES}/profiles/skin-care.png`,
    comments: "0",
    likes: "2k",
    views: "1.5k",
  },
  {
    id: 3,
    title: "Designer Footwear",
    mediaImage: `${ASSET_IMAGES}/profiles/footwear.png`,
    comments: "0",
    likes: "2k",
    views: "1.5k",
  },
  {
    id: 4,
    title: "Next Trip Bag",
    mediaImage: `${ASSET_IMAGES}/profiles/beg.png`,
    comments: "0",
    likes: "2k",
    views: "1.5k",
  },
  {
    id: 5,
    title: "Curology Facewash",
    mediaImage: `${ASSET_IMAGES}/profiles/face-wash.png`,
    comments: "0",
    likes: "2k",
    views: "1.5k",
  },
];
export { profileMediaData, type ProfileMediaProps };
