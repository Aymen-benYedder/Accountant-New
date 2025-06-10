import { ResponsiveContainer, Treemap } from 'recharts';
import { treemapData } from '../..';
import { JumboCard } from '@jumbo/components';

const COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D297',
  '#E2CF45',
  '#F8C12D',
];

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[Math.floor((index / root.children.length) * 6)]
              : 'none',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor='middle'
          fill='#fff'
          fontSize={14}
        >
          {name}
        </text>
      ) : null}
      {depth === 1 ? (
        <text x={x + 4} y={y + 18} fill='#fff' fontSize={16} fillOpacity={0.9}>
          {index + 1}
        </text>
      ) : null}
    </g>
  );
};

const CustomContentTreemapChart = () => (
  <JumboCard
    title={'Custom Content Treemap Chart'}
    contentWrapper
    contentSx={{ pt: 0 }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <Treemap
        data={treemapData}
        dataKey='size'
        stroke='#fff'
        fill={'#1e88e5'}
        content={<CustomizedContent colors={COLORS} />}
      />
    </ResponsiveContainer>
  </JumboCard>
);

export { CustomContentTreemapChart };
