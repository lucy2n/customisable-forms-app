import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type DataProps = {
  choices: string[][];
  initialOptions: string[];
};

const AnswersVerticalBarChart: React.FC<DataProps> = ({ choices, initialOptions }) => {
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([]);
  const [selectedOptions] = useState<string[]>(initialOptions);

  useEffect(() => {
    const updatedData = initialOptions.map((option) => ({
      name: option,
      count: choices.filter((choice) => choice.includes(option)).length,
    }));
    setChartData(updatedData);
  }, [choices, initialOptions]);

  return (
    <div style={{ display: 'flex' }}>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart
          data={chartData.filter((data) => selectedOptions.includes(data.name))}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'none' }}/>
          <YAxis dataKey="name" type="category" tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#FFAAAA"
            barSize={20}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnswersVerticalBarChart;