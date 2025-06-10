import {
  RiChat4Line,
  RiShieldKeyholeLine,
  RiSmartphoneLine,
} from "react-icons/ri";

interface AuthProps {
  icon: React.ReactNode;
  title: string;
  subheader: string;
  config: boolean;
}
const FactoAuthData: AuthProps[] = [
  {
    icon: <RiSmartphoneLine fontSize={24} />,
    title: "Authenticator app",
    subheader:
      "Use an authentication app or browser extension to generate one-time codes.",
    config: false,
  },
  {
    icon: <RiChat4Line fontSize={24} />,
    title: "SMS/Text message",
    subheader:
      "You will receive one-time codes at this phone number: +91 XXXXXX8538",
    config: true,
  },
  {
    icon: <RiShieldKeyholeLine fontSize={24} />,
    title: "Security keys",
    subheader:
      "Security keys are webauthn credentials that can only be used as a second factor of authentication.",
    config: true,
  },
];

export { FactoAuthData, type AuthProps };
