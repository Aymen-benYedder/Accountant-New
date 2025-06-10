import { ASSET_AVATARS } from '@app/_utilities/constants/paths';

export type ProjectType = {
  id: number;
  name: string;
  dueDate: string;
  isDelayed: boolean;
  progress: number;
  team: number[];
  category: {
    name: string;
    color: string;
  };
};
export const projects: ProjectType[] = [
  {
    id: 21,
    name: 'New UI design for project jumbo.',
    dueDate: 'July 30, 2020',
    isDelayed: false,
    progress: 70,
    team: [1, 2, 5, 6],
    category: {
      name: 'Development',
      color: '#7352C7',
    },
  },
  {
    id: 22,
    name: 'Promo graphics design for wieldy',
    dueDate: 'July 25, 2020',
    isDelayed: false,
    progress: 60,
    team: [2, 3, 5],
    category: {
      name: 'Designing',
      color: '#3BD2A2',
    },
  },
  {
    id: 24,
    name: 'Social media campaign for Drift',
    dueDate: 'July 09, 2020',
    isDelayed: true,
    progress: 90,
    team: [2, 6],
    category: {
      name: 'Marketing',
      color: '#E73145',
    },
  },
  {
    id: 28,
    name: 'Backend REST APIs implementation',
    dueDate: 'July 15, 2020',
    isDelayed: false,
    progress: 20,
    team: [2, 3, 4],
    category: {
      name: 'Development',
      color: '#7352C7',
    },
  },
  {
    id: 29,
    name: 'Prepare a copy for email marketing',
    dueDate: 'July 15, 2020',
    isDelayed: false,
    progress: 40,
    team: [1, 2, 3, 5],
    category: {
      name: 'Marketing',
      color: '#E73145',
    },
  },
];

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  profilePic?: string;
}
export const users: UserType[] = [
  {
    id: 1,
    firstName: 'Joy',
    lastName: 'Parrish',
    displayName: 'P. Joy',
  },
  {
    id: 2,
    firstName: 'Rob',
    lastName: 'Williamson',
    displayName: 'W. Rob',
  },
  {
    id: 3,
    firstName: 'Ram',
    lastName: 'Malhotra',
    displayName: 'M. Ram',
  },
  {
    id: 4,
    firstName: 'Chelsea',
    lastName: 'Brown',
    displayName: 'B. Chelsea',
  },
  {
    id: 5,
    firstName: 'Nicolas',
    lastName: 'Cage',
    displayName: 'C. Nicolas',
  },
  {
    id: 6,
    firstName: 'Amily',
    lastName: 'Jackson',
    displayName: 'B. Bob',
  },
  {
    id: 7,
    firstName: 'Ken',
    lastName: 'Ramirez',
    displayName: 'R. Ken',
  },
  {
    id: 8,
    firstName: 'Domenic',
    lastName: 'Harris',
    displayName: 'H. Domenic',
  },
  {
    id: 9,
    firstName: 'Shawn',
    lastName: 'Michael',
    displayName: 'M. Shawn',
  },
  {
    id: 10,
    firstName: 'Ron',
    lastName: 'Brown',
    displayName: 'B. Ron',
  },
  {
    id: 11,
    firstName: 'Nicol',
    lastName: 'Shorter',
    displayName: 'S. Nicol',
  },
  {
    id: 12,
    firstName: 'Dinesh',
    lastName: 'Kamat',
    displayName: 'K. Dinesh',
  },
  {
    id: 13,
    firstName: 'Vikram',
    lastName: 'Kumar',
    displayName: 'K. Vikram',
  },
  {
    id: 14,
    firstName: 'Stuart',
    lastName: 'Parrish',
    displayName: 'P. Stuart',
  },
];

const fakeUsers: UserType[] = [
  {
    id: 1,
    firstName: 'Joy',
    lastName: 'Parrish',
    displayName: 'P. Joy',
    profilePic: `${ASSET_AVATARS}/avatar10.jpg`,
  },
  {
    id: 2,
    firstName: 'Rob',
    lastName: 'Williamson',
    displayName: 'W. Rob',
    profilePic: `${ASSET_AVATARS}/avatar12.jpg`,
  },
  {
    id: 3,
    firstName: 'Ram',
    lastName: 'Malhotra',
    displayName: 'M. Ram',
    profilePic: `${ASSET_AVATARS}/jonathan.jpg`,
  },
  {
    id: 4,
    firstName: 'Chelsea',
    lastName: 'Brown',
    displayName: 'B. Chelsea',
    profilePic: `${ASSET_AVATARS}/jeson-born.jpg`,
  },
  {
    id: 5,
    firstName: 'Nicolas',
    lastName: 'Cage',
    displayName: 'C. Nicolas',
    profilePic: `${ASSET_AVATARS}/martin-j.jpg`,
  },
  {
    id: 6,
    firstName: 'Amily',
    lastName: 'Jackson',
    displayName: 'B. Bob',
    profilePic: `${ASSET_AVATARS}/avatar6.jpg`,
  },
  {
    id: 7,
    firstName: 'Ken',
    lastName: 'Ramirez',
    displayName: 'R. Ken',
    profilePic: `${ASSET_AVATARS}/ron-doe.jpg`,
  },
  {
    id: 8,
    firstName: 'Domenic',
    lastName: 'Harris',
    displayName: 'H. Domenic',
    profilePic: `${ASSET_AVATARS}/jimmy-jo.jpg`,
  },
  {
    id: 9,
    firstName: 'Shawn',
    lastName: 'Michael',
    displayName: 'M. Shawn',
    profilePic: `${ASSET_AVATARS}/domnic-brown.jpg`,
  },
  {
    id: 10,
    firstName: 'Ron',
    lastName: 'Brown',
    displayName: 'B. Ron',
    profilePic: `${ASSET_AVATARS}/ron-doe.jpg`,
  },
  {
    id: 11,
    firstName: 'Nicol',
    lastName: 'Shorter',
    displayName: 'S. Nicol',
    profilePic: `${ASSET_AVATARS}/avatar13.jpg`,
  },
  {
    id: 12,
    firstName: 'Dinesh',
    lastName: 'Kamat',
    displayName: 'K. Dinesh',
    profilePic: `${ASSET_AVATARS}/john-smith.jpg`,
  },
  {
    id: 13,
    firstName: 'Vikram',
    lastName: 'Kumar',
    displayName: 'K. Vikram',
    profilePic: `${ASSET_AVATARS}/steve-smith.jpg`,
  },
  {
    id: 14,
    firstName: 'Stuart',
    lastName: 'Parrish',
    displayName: 'P. Stuart',
    profilePic: `${ASSET_AVATARS}/ken-ramirez.jpg`,
  },
];

export const projectUsers: UserType[] = [
  fakeUsers[0],
  fakeUsers[1],
  fakeUsers[2],
  fakeUsers[3],
  fakeUsers[4],
  fakeUsers[5],
];
