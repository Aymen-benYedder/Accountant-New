import {Legend, RadialBar, RadialBarChart, ResponsiveContainer} from 'recharts';
import { radialData } from '../..';
import { JumboCard } from '@jumbo/components';

const style = {
    top: 20,
    left: '20%',
    lineHeight: '24px',
};

const SimpleRadialChart = () => (
    <JumboCard title={"Simple Radial Bar Chart"} contentWrapper contentSx={{ backgroundColor: 'background.paper'}}>
        <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart innerRadius={20} outerRadius={140} barSize={10} data={radialData}>
                <RadialBar  label background  dataKey="uv"/>
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle"
                        wrapperStyle={style}/>
            </RadialBarChart>
        </ResponsiveContainer>
    </JumboCard>
);

export {SimpleRadialChart};
