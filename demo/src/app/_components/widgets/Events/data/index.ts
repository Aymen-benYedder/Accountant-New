import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";

export type EventProps = {
  id: number;
  profile_Pic: string;
  title: string;
  name: string;
  location: string;
  date: string;
};
export const events: EventProps[] = [
  {
    id: 1,
    profile_Pic: getAssetPath(`${ASSET_IMAGES}/event1.jpg`, "420x380"),
    title: "Sundance Film Festival",
    name: "Musical Concert",
    location: "Downsview Park, Toronto, Canada",
    date: "Feb 23, 2020",
  },
  {
    id: 2,
    profile_Pic: getAssetPath(`${ASSET_IMAGES}/event2.jpg`, "420x380"),
    title: "Underwater Musical Festival",
    name: "Magic Show",
    location: "Downsview Park, Toronto, Canada",
    date: "Feb 11, 2020",
  },
  {
    id: 3,
    profile_Pic: getAssetPath(`${ASSET_IMAGES}/event3.jpg`, "420x380"),
    title: "Village Feast Fac",
    name: "Musical Concert",
    location: "Downsview Park, Toronto, Canada",
    date: "Jan 02, 2020",
  },
];
