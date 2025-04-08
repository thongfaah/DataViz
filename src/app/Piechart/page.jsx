import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from "recharts";

const PieChartView = ({ pieData, width, height }) => {
  return pieData.length > 0 ? (
    <div className="flex justify-center items-center">
      <ResponsiveContainer width={width} height={height - 100}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <p>กรุณาเลือก 2 คอลัมน์ (1 Label + 1 Value) สำหรับแผนภูมิวงกลม</p>
  );
};

export default PieChartView;