type LabelProps = {
  id: number;
  name?: string;
  slug?: string;
  color?: string;
};
type ContactProps = {
  id: number;
  name: string;
  profile_pic: string;
  email: string;
  phone: string;
  designation: string;
  starred: boolean;
  frequent: boolean;
  company: string;
  labels?: number[] | null;
  folder: string;
  slug?: string;
};
type FolderProps = {
  icon: React.ReactNode;
  label: string;
  slug?: string;
  path: string;
  count?: number;
  selected?: boolean;
};

export { type LabelProps, type ContactProps, type FolderProps };
