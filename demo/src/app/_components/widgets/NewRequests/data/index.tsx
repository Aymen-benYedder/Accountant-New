import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath, timeSince } from "@app/_utilities/helpers";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

export type RequestDataProps = {
  id: number | string;
  user: {
    id: number | string;
    name: string;
    username: string;
    profile_pic: string;
  };
  follow: boolean;
  created_at: string;
};

export type MenuItemsProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};
export const requests: RequestDataProps[] = [
  {
    id: 32,
    user: {
      id: 21,
      name: "Julia Robert",
      username: "julia.robert",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar4.jpg`, "40x40"),
    },
    follow: true,
    created_at: timeSince(0.6),
  },
  {
    id: 33,
    user: {
      id: 22,
      name: "Joe Lee",
      username: "joe.lee",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "40x40"),
    },
    follow: false,
    created_at: timeSince(0.9),
  },
  {
    id: 34,
    user: {
      id: 23,
      name: "Chang Lee",
      username: "chang.lee",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "40x40"),
    },
    follow: false,
    created_at: timeSince(1.3),
  },
  {
    id: 35,
    user: {
      id: 24,
      name: "Mickey Arthur",
      username: "mickey.arthur",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar7.jpg`, "40x40"),
    },
    follow: true,
    created_at: timeSince(12),
  },
  {
    id: 36,
    user: {
      id: 25,
      name: "Shane Watson",
      username: "shane.watson",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar8.jpg`, "40x40"),
    },
    follow: true,
    created_at: timeSince(34),
  },
];
export const menuItems: MenuItemsProps[] = [
  {
    icon: <DoneAllIcon sx={{ fontSize: 20 }} />,
    title: "Accept",
    value: "ACCEPTED",
  },
  {
    icon: <CloseIcon sx={{ fontSize: 20 }} />,
    title: "Deny",
    value: "DENIED",
  },
  {
    icon: <VisibilityOffIcon sx={{ fontSize: 20 }} />,
    title: "Ignore",
    value: "IGNORED",
  },
];

export function reducer(state: RequestDataProps[], action: any) {
  switch (action.type) {
    case "RELOAD":
      return action.payload;
    case "ACCEPTED":
      return state.filter(
        (item: RequestDataProps) => item.id !== action.payload.id
      );
    case "DENIED":
      return state.filter(
        (item: RequestDataProps) => item.id !== action.payload.id
      );
    case "IGNORED":
      return state.filter(
        (item: RequestDataProps) => item.id !== action.payload.id
      );
    default:
      throw new Error();
  }
}
