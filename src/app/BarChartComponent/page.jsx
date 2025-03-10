"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ selectedColumns, data }) => {
  if (!selectedColumns.length || !data.length) {
    return <p className="text-center text-gray-500">กรุณาเลือกคอลัมน์ก่อนแสดงกราฟ</p>;
  }

  // แปลงข้อมูลให้ Recharts ใช้
  const chartData = data.map((row) => {
    let newObj = {};
    selectedColumns.forEach((col) => {
      newObj[col] = isNaN(row[col]) ? 0 : Number(row[col]); // ตรวจสอบค่าตัวเลข
    });
    return newObj;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey={selectedColumns[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedColumns.slice(1).map((col, index) => (
          <Bar key={index} dataKey={col} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
