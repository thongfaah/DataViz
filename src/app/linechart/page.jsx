"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function LineChartView({ chartData, selectedColumns, selectedFile, width, height, colors= {} }) {
  

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedColumns[selectedFile]?.slice(1).map((col, index) => (
            <Line
              key={col}
              type="monotone"
              dataKey={col}
              stroke={colors[`colorSet${index}`] || "#8884d8"}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
