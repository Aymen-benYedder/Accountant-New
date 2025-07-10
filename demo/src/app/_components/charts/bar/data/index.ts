interface BarProps {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  pvError?: number;
}
export const barData: BarProps[] = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, pvError: 500 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, pvError: 500 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, pvError: 100 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, pvError: 500 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, pvError: 500 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, pvError: 500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, pvError: 500 },
];

export const posNegData: BarProps[] = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: -1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
