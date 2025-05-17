"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartView = ({ chartData, selectedColumns, selectedFile, width, height }) => {
  if (!selectedColumns[selectedFile] || selectedColumns[selectedFile].length < 2) {
    return <div>📢 โปรดเลือกคอลัมน์อย่างน้อย 2 คอลัมน์</div>;
  }

  return (
    <div style={{ width: width || "100%", height: height || "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={selectedColumns[selectedFile][0]} />
          <YAxis />
          <Tooltip />
          {selectedColumns[selectedFile].slice(1).map((col, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={col}
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartView;
