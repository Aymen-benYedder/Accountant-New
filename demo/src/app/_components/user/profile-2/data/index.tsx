import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { PiUserListLight } from "react-icons/pi";
import {
  RiAtLine,
  RiLockPasswordLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiShieldUserLine,
} from "react-icons/ri";

interface UserConnectedProps {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const userConnectedData: UserConnectedProps[] = [
  {
    id: 1,
    name: "Somesh Deboshmati",
    role: "Full-Stack Developer (MERN)",
    avatar: `${ASSET_AVATARS}/avatar4.jpg`,
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Frontend Developer (React, Angular)",
    avatar: `${ASSET_AVATARS}/avatar12.jpg`,
  },
  {
    id: 3,
    name: "Joshua Brodsky",
    role: "UI/UX Advocate",
    avatar: `${ASSET_AVATARS}/avatar3.jpg`,
  },
  {
    id: 4,
    name: "Allen Woods",
    role: "UI/UX Designer",
    avatar: `${ASSET_AVATARS}/avatar14.jpg`,
  },
];

interface UserInformationProps {
  icon: React.ReactNode;
  key: string;
  value: string;
}
const usersData: UserInformationProps[] = [
  {
    icon: <RiShieldUserLine fontSize={22} />,
    key: "User ID",
    value: "456879",
  },
  {
    icon: <RiMailLine fontSize={22} />,
    key: "Email",
    value: "chris.hardy@example.com",
  },
  {
    icon: <RiAtLine fontSize={22} />,
    key: "Handle",
    value: "@ChrisHardy",
  },
  {
    icon: <RiPhoneLine fontSize={22} />,
    key: "Phone Number",
    value: "+1 999 (999) 9999",
  },
  {
    icon: <RiMapPinLine fontSize={22} />,
    key: "Address",
    value: "Bikaner, Rajasthan, India",
  },
  {
    icon: <RiLockPasswordLine fontSize={22} />,
    key: "2-Step Authentication",
    value: "Not Setup Yet",
  },
  {
    icon: <PiUserListLight style={{ fontSize: 28 }} />,
    key: "User Since",
    value: "April, 2019",
  },
];
export { userConnectedData, usersData, type UserConnectedProps };
