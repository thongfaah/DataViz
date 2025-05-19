import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BarChartView = ({ chartData, selectedColumns, selectedFile, width, height, colors }) => {
// ✅ ถ้า colors ถูกส่งมาจาก MoreGraphSidebar จะใช้ชุดสีนี้
  const colorMap = useMemo(() => {
    if (colors) {
      const mappedColors = {};
      selectedColumns[selectedFile]?.slice(1).forEach((col, index) => {
        mappedColors[col] = colors[`colorSet${index}`] || `hsl(${(index * 60) % 360}, 70%, 50%)`;
      });
      return mappedColors;
    } else {
      // ✅ Default Color Map
      const defaultColors = {};
      selectedColumns[selectedFile]?.slice(1).forEach((col, index) => {
        defaultColors[col] = `hsl(${(index * 60) % 360}, 70%, 50%)`;
      });
      return defaultColors;
    }
  }, [selectedColumns, selectedFile, colors]);

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
            <Bar key={index} dataKey={col} fill={colorMap[col]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartView;