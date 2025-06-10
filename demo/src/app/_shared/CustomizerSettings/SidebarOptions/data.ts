import { ASSET_IMAGES } from "@app/_utilities/constants/paths";

interface BgColorOptionProps {
  name: string;
  type: string;
  color?: string;
  colors?: string[];
}

const bgColorOptions: BgColorOptionProps[] = [
  {
    name: "theme-1",
    type: "single",
    color: "#4f46ba",
  },
  {
    name: "theme-2",
    type: "single",
    color: "#b94343",
  },
  {
    name: "theme-3",
    type: "single",
    color: "#212121",
  },
  {
    name: "theme-4",
    type: "single",
    color: "#348f6c",
  },
  {
    name: "theme-5",
    type: "single",
    color: "#26324d",
  },
  {
    name: "theme-6",
    type: "gradient",
    colors: ["#7f5a83", "#0d324d"],
  },
  {
    name: "theme-7",
    type: "gradient",
    colors: ["#099", "#36096d"],
  },
  {
    name: "theme-8",
    type: "gradient",
    colors: ["#ee696b", "#523a78"],
  },
  {
    name: "theme-9",
    type: "gradient",
    colors: ["#03ce97", "#00619a"],
  },
  {
    name: "theme-10",
    type: "gradient",
    colors: ["#80ced7", "#04619f"],
  },
];

interface BgImageOptionProps {
  name: string;
  thumb: string;
  full: string;
}
const bgImageOptions: BgImageOptionProps[] = [
  {
    name: "sidebar-1",
    thumb: `${ASSET_IMAGES}/customizer/sidebar/sidebar-1.png`,
    full: `${ASSET_IMAGES}/customizer/sidebar/full-images/sidebar-1.jpg`,
  },
  {
    name: "sidebar-2",
    thumb: `${ASSET_IMAGES}/customizer/sidebar/sidebar-2.png`,
    full: `${ASSET_IMAGES}/customizer/sidebar/full-images/sidebar-2.jpg`,
  },
  {
    name: "sidebar-3",
    thumb: `${ASSET_IMAGES}/customizer/sidebar/sidebar-3.png`,
    full: `${ASSET_IMAGES}/customizer/sidebar/full-images/sidebar-3.jpg`,
  },
  {
    name: "sidebar-4",
    thumb: `${ASSET_IMAGES}/customizer/sidebar/sidebar-5.png`,
    full: `${ASSET_IMAGES}/customizer/sidebar/full-images/sidebar-5.jpg`,
  },
  {
    name: "sidebar-5",
    thumb: `${ASSET_IMAGES}/customizer/sidebar/sidebar-6.png`,
    full: `${ASSET_IMAGES}/customizer/sidebar/full-images/sidebar-6.jpg`,
  },
];
export {
  bgColorOptions,
  bgImageOptions,
  type BgColorOptionProps,
  type BgImageOptionProps,
};
