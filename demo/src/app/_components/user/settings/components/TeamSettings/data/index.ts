interface TeamMemberProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  access: string;
  lastActive: string;
  status: string;
}
const teamMembers: TeamMemberProps[] = [
  {
    firstName: "Mitchel",
    lastName: "Stark",
    email: "mitchel.stark@example",
    profilePic: "",
    access: "Org Admin",
    lastActive: "25 Oct, 2023",
    status: "invited",
  },
  {
    firstName: "Chris",
    lastName: "Harris",
    email: "c.harris@example.com",
    profilePic: "",
    access: "owner",
    lastActive: "25 Oct, 2023",
    status: "active",
  },
];

export { teamMembers, type TeamMemberProps };
