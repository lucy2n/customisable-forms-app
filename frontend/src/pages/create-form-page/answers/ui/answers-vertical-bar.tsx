import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DataProps = {
  choices: string[][];
  initialOptions: string[];
};

// Helper function to generate random colors for bars
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AnswersVerticalBarChart: React.FC<DataProps> = ({ choices, initialOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const updatedData = initialOptions.map((option) => ({
      name: option,
      count: choices.filter((choice) => choice.includes(option)).length,
    }));
    setChartData(updatedData);
  }, [choices]);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((selected) => selected !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left side: list of checkboxes */}
      <div style={{ marginRight: '20px' }}>
        <h3>Select Options</h3>
        {initialOptions.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              onChange={() => handleCheckboxChange(option)}
              checked={selectedOptions.includes(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>

      {/* Right side: Vertical bar chart */}
      <ResponsiveContainer width="80%" height={400}>
        <BarChart
          data={chartData.filter((data) => selectedOptions.includes(data.name))}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          {chartData
            .filter((data) => selectedOptions.includes(data.name))
            .map((_, index) => (
              <Bar
                key={index}
                dataKey="count"
                fill={getRandomColor()}
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