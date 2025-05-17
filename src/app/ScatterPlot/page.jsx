"use client";
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ScatterPlotView = ({ chartData, selectedColumns, selectedFile, width, height }) => {
  const [xKey, yKey] = selectedColumns[selectedFile] || [];

  // Debug แสดงชื่อคีย์และตัวอย่างข้อมูล
  console.log("xKey:", xKey, "yKey:", yKey);
  console.log("Sample data:", chartData?.[0]);

  if (!xKey || !yKey) {
    return <p className="text-red-500 p-4">📢 กรุณาเลือก 2 คอลัมน์เพื่อแสดง Scatter Plot</p>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis dataKey={xKey} name={xKey} />
        <YAxis dataKey={yKey} name={yKey} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name={selectedFile} data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlotView;
