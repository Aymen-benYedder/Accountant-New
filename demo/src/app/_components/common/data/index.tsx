import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { Span } from "@jumbo/shared";
import { Typography } from "@mui/material";
import {
  RiMailUnreadLine,
  RiNotificationLine,
  RiSmartphoneLine,
} from "react-icons/ri";

const profileSkillsData = [
  {
    id: 1,
    title: "Full-Stack Developer (MERN)",
    date: "Since 2016",
    desc: "Working",
    skills: [
      "MongoDB",
      "ExpressJS",
      "React",
      "NodeJS",
      "Javascript",
      "Typescript",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    date: "Since 2021",
    desc: "Advocate of UI/UX Principles",
    skills: ["Design Persona", "Figma", "After Effect", "Adobe Illustrator"],
  },
];

interface LicenseProps {
  id: number;
  name: string;
  profileImage: string;
  desc: React.ReactNode;
}
const licenseData: LicenseProps[] = [
  {
    id: 1,
    name: "Business Analytics",
    profileImage: `${ASSET_IMAGES}/image(2).png`,
    desc: (
      <>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          component={"span"}
          display={"block"}
        >
          {"Cornell University"}
        </Typography>
        <Span>{"Issued Jan 2024"}</Span>
      </>
    ),
  },
  {
    id: 2,
    name: "Quantum Computing",
    profileImage: `${ASSET_IMAGES}/image(1).png`,
    desc: (
      <>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          component={"span"}
          display={"block"}
        >
          {"MIT"}
        </Typography>
        <Span>{"Issued 2024"}</Span>
      </>
    ),
  },
];

interface ExperienceProps {
  id: number;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  companyLogo: string;
}

const experiencesData: ExperienceProps[] = [
  {
    id: 1,
    role: "Sr. Business System Analyst",
    company: "Charter Communications - Full-time",
    location: "California, United States",
    type: "",
    period: "Oct 2023 - Present",
    companyLogo: `${ASSET_IMAGES}/profiles/work-1.png`, // Replace with actual logo link
  },
  {
    id: 2,
    role: "Associate PM/Scrum Master",
    company: "Auxano Technology Consultants",
    location: "NJ, United States - Remote",
    type: "",
    period: "Apr 2022 - Sep 2023",
    companyLogo: `${ASSET_IMAGES}/profiles/work-2.png`, // Replace with actual logo link
  },
];

interface PaymentCardProps {
  id: number;
  cardNumber: string;
  cardName: string;
  cardImage: string;
  expiryDate: string;
  primary: boolean;
}

const paymentCardData: PaymentCardProps[] = [
  {
    id: 124,
    cardNumber: "123456789123",
    cardName: "Visa",
    cardImage: `${ASSET_IMAGES}/etc/visa.png`,
    expiryDate: "07/2025",
    primary: true,
  },
  {
    id: 125,
    cardNumber: "123456789456",
    cardName: "Mastercard",
    expiryDate: "08/2027",
    cardImage: `${ASSET_IMAGES}/etc/mastercard.png`,
    primary: false,
  },
];

interface NotificationProps {
  id: number;
  title: string;
  description: string;
  icon: any;
}

const notificationsData: NotificationProps[] = [
  {
    id: 1,
    title: "In-app Notifications",
    description: "Notifications delivered inside the app",
    icon: <RiNotificationLine fontSize={22} />,
  },
  {
    id: 2,
    title: "SMS Notifications",
    description: "Notifications delivered to the phone via SMS",
    icon: <RiSmartphoneLine fontSize={22} />,
  },
  {
    id: 3,
    title: "Email Notifications",
    description:
      "Notifications delivered to your primary email address abc@example.com",
    icon: <RiMailUnreadLine fontSize={22} />,
  },
];

export {
  experiencesData,
  licenseData,
  notificationsData,
  paymentCardData,
  profileSkillsData,
  type ExperienceProps,
  type LicenseProps,
  type NotificationProps,
  type PaymentCardProps,
};
