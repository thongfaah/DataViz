import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BarChartView = ({ chartData, selectedColumns, selectedFile, width, height }) => {
  const generateColors = (col) => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <div className="flex justify-center items-center">
      <ResponsiveContainer width={width} height={height - 100}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedColumns[selectedFile]?.slice(1).map((col, index) => (
            <Bar key={index} dataKey={col} fill={generateColors(col)} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartView;