import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DataProps = {
  choices: string[][];
  initialOptions: string[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#FF8888', '#FFAAAA'];

const AnswersVerticalBarChart: React.FC<DataProps> = ({ choices, initialOptions }) => {
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const updatedData = initialOptions.map((option) => ({
      name: option,
      count: choices.filter((choice) => choice.includes(option)).length,
    }));
    setChartData(updatedData);
  }, [choices]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Left side: list of checkboxes */}
      <div style={{ marginRight: '20px' }}>
        <h3>Select Options</h3>
        {initialOptions.map((entry, index) => (
            <li key={`list-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
              {entry}
            </li>
          ))}
      </div>

      {/* Right side: Vertical bar chart */}
      <ResponsiveContainer width="80%" height={400}>
        <BarChart
          data={chartData.filter((data) => choices.includes(data.name))}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          {chartData
            .filter((data) => choices.includes(data.name))
            .map((_, index) => (
              <Bar
                key={index}
                dataKey="count"
                fill={COLORS[index % COLORS.length]}
                barSize={20}
                radius={[5, 5, 0, 0]}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnswersVerticalBarChart;