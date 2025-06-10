import { PersonalDetail } from "../components/onboarding-content";
import { PersonalDetailSidebar } from "../components/onboarding-sidebar";

const steps: any = [
  {
    key: "personal-detail",
    component: PersonalDetail,
  },
  {
    key: "about-organisation",
    component: PersonalDetail,
  },
  {
    key: "payment-detail",
    component: PersonalDetail,
  },
  {
    key: "billing-address",
    component: PersonalDetail,
  },
  {
    key: "final-onboarding",
    component: PersonalDetail,
  },
];

const sidebarSteps: any = [
  {
    key: "personal-detail",
    component: PersonalDetailSidebar,
  },
  {
    key: "about-organisation",
    component: PersonalDetailSidebar,
  },
  {
    key: "payment-detail",
    component: PersonalDetailSidebar,
  },
  {
    key: "billing-address",
    component: PersonalDetailSidebar,
  },
  {
    key: "final-onboarding",
    component: PersonalDetailSidebar,
  },
];
interface Onboarding3Props {
  id: number;
  picture: string;
  title: string;
  description: string;
}
const onboardingData: Onboarding3Props[] = [
  {
    id: 1,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
  {
    id: 2,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
  {
    id: 3,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
  {
    id: 4,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
  {
    id: 5,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
  {
    id: 6,
    picture: "image",
    title: "Pictures Hosting Service And Space",
    description: `Host your pictures over the cloud and access them from
                  anywhere. It starts with FREE!`,
  },
];

export { onboardingData, sidebarSteps, steps, type Onboarding3Props };
