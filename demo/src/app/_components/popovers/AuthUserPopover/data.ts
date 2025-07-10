import { ASSET_AVATARS } from '@app/_utilities/constants/paths';
import { getAssetPath } from '@app/_utilities/helpers';

type AuthUserProps = {
  email: string;
  name: string;
  profile_pic: string;
  handle: string;
  job_title: string;
};
export const authUser: AuthUserProps = {
  email: 'kiley.brown@example.com',
  name: 'Kiley Brown',
  profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar10.jpg`, `60x60`),
  handle: 'kiley.brown@example.com',
  job_title: 'Creative Head',
};
