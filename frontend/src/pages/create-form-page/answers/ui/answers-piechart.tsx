import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface DataEntry {
  name: string;
  value: number;
}
interface AnswersPiechartProps {
  data: DataEntry[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#FF8888', '#FFAAAA'];

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AnswersPiechart: React.FC<AnswersPiechartProps> = ({ data }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
      </PieChart>

      <div style={{ marginLeft: '20px' }}>
        <ul>
          {data.map((entry, index) => (
            <li key={`list-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnswersPiechart;