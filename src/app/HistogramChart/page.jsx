import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import { bin } from "d3-array";

const HistogramChartView = ({ data, dataKey, colors }) => {
  const values = data.map((item) => item[dataKey]);
  const bins = bin()(values);

  const histogramData = bins.map((bin) => ({
    name: `${(bin.x0 + bin.x1) / 2}`, // หรือใช้ `${bin.x0} - ${bin.x1}` ถ้าอยากแสดงช่วง
    count: bin.length,
  }));

  // ถ้าไม่มีสีที่ส่งมาให้กำหนดค่าเริ่มต้น
  const barColor = colors?.colorSet0 || "#8884d8";

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label
              value={dataKey}
              position="insideBottom"
              offset={-5}
            />
          </XAxis>
          <YAxis>
            <Label
              value="จำนวน"
              angle={-90}
              position="insideLeft"
              offset={-5}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="count" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChartView;
