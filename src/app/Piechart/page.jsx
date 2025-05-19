import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const PieChartView = ({ pieData, width, height, colors = {} }) => {
  // ✅ ตรวจสอบค่า colors ก่อน
  console.log("📌 [PieChartView] Colors Received: ", colors);

  return pieData.length > 0 ? (
    <div className="flex justify-center items-center">
      <ResponsiveContainer width={width} height={height - 100}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {/* ✅ ใช้ Cell ภายใน Pie */}
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors ? colors[`colorSet${index}`] || "#8884d8" : "#8884d8"}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <p>กรุณาเลือก 2 คอลัมน์ (1 Label + 1 Value) สำหรับแผนภูมิวงกลม</p>
  );
};

export default PieChartView;