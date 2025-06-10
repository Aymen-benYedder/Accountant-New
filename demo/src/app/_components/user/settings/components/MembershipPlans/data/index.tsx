interface MembershipPlanProps {
  id: number;
  name: string;
  content: string;
  cost: string;
}
const membersData: MembershipPlanProps[] = [
  {
    id: 1,
    name: "Stock Photos Downloads",
    content: "52 photos downloaded",
    cost: "$23",
  },
  {
    id: 2,
    name: "Stock Video Templates Downloads",
    content: "32 video templates downloaded",
    cost: "$6",
  },
  { id: 3, name: "Course Purchased", content: "4 courses", cost: "$12.57" },
  { id: 4, name: "Projects Created", content: "2 projects", cost: "$15" },
];

const membershipsChartData = [
  { name: "Jan", Projects: 5, Downloads: 10, Requests: 20 },
  { name: "Feb", Projects: 6, Downloads: 8, Requests: 18 },
  { name: "Mar", Projects: 7, Downloads: 12, Requests: 22 },
  { name: "Apr", Projects: 5, Downloads: 9, Requests: 15 },
  { name: "May", Projects: 6, Downloads: 11, Requests: 21 },
  { name: "Jun", Projects: 5, Downloads: 8, Requests: 17 },
  { name: "Jul", Projects: 4, Downloads: 9, Requests: 15 },
  { name: "Aug", Projects: 6, Downloads: 10, Requests: 25 },
  { name: "Sep", Projects: 3, Downloads: 5, Requests: 9 },
  { name: "Oct", Projects: 2, Downloads: 4, Requests: 7 },
  { name: "Nov", Projects: 3, Downloads: 4, Requests: 6 },
  { name: "Dec", Projects: 2, Downloads: 3, Requests: 5 },
];
export { membersData, membershipsChartData, type MembershipPlanProps };
