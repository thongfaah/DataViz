"use client";
import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

const TreeMapView = ({ treeData }) => {
  if (!treeData || treeData.length === 0) {
    return <p className="text-sm text-gray-500">กรุณาเลือกไฟล์และคอลัมน์ให้ครบถ้วน</p>;
  }

  return (
    <div className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={treeData}
        dataKey="size"
        nameKey="name"
        stroke="#fff"
        fill="#8884d8"
      >
        <Tooltip
          content={({ payload }) => {
            if (!payload || !payload[0]) return null;
            const { name, size } = payload[0].payload;
            return (
              <div className="bg-white shadow-md rounded p-2 text-sm border">
                <p><strong>{name}</strong></p>
                <p>Value: {size}</p>
              </div>
            );
          }}
        />
      </Treemap>
    </ResponsiveContainer>
  </div>
  );
};

export default TreeMapView;
