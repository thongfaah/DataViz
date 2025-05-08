"use client";
import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Scatter,
  ZAxis,
} from "recharts";

const BubbleChartView = ({ chartData, selectedColumns, selectedFile, width, height }) => {
  const selectedCols = selectedColumns[selectedFile];

  if (!selectedFile || !Array.isArray(chartData) || !Array.isArray(selectedCols) || selectedCols.length < 3) {
    return <p>📢 โปรดเลือกคอลัมน์อย่างน้อย 3 คอลัมน์เพื่อแสดง Bubble Chart</p>;
  }

  const [xKey, yKey, zKey] = selectedCols;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey={xKey} name={xKey} />
        <YAxis dataKey={yKey} name={yKey} />
        <ZAxis dataKey={zKey} range={[50, 500]} name={zKey} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChartView;
