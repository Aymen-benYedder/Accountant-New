import { ASSET_IMAGES } from "@app/_utilities/constants/paths";

interface OrganizationProps {
  organizationName: string;
  desc: string;
  image: string;
  lastActive: string;
  access: string;
  status: string;
}
const organinzationsData: OrganizationProps[] = [
  {
    organizationName: "G Axon Tech Pvt Ltd",
    desc: "10 members",
    image: `${ASSET_IMAGES}/organizations/avatar-2.png`,
    lastActive: "25 Oct, 2023",
    access: "member",
    status: "invited",
  },
  {
    organizationName: "ABC Inc.",
    desc: "32 members",
    image: `${ASSET_IMAGES}/organizations/avatar-1.png`,
    lastActive: "25 Oct, 2023",
    access: "owner",
    status: "active",
  },
  {
    organizationName: "Example Ltd.",
    desc: "239 Members",
    image: `${ASSET_IMAGES}/organizations/avatar-3.png`,
    lastActive: "25 Oct, 2023",
    access: "member",
    status: "active",
  },
  {
    organizationName: "XManRevolution Pvt. Ltd.",
    desc: "221 members",
    image: `${ASSET_IMAGES}/organizations/avatar-4.png`,
    lastActive: "25 Oct, 2023",
    access: "member",
    status: "active",
  },
  {
    organizationName: "DigDeep Inc",
    desc: "23 members",
    image: `${ASSET_IMAGES}/organizations/avatar-5.png`,
    lastActive: "25 Oct, 2023",
    access: "owner",
    status: "invited",
  },
];

export { organinzationsData, type OrganizationProps };
