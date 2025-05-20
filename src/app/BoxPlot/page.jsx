// components/BoxPlotView.jsx
import React from "react";
import Plot from "react-plotly.js";

const BoxPlotView = ({ chartData, selectedColumns, selectedFile, width, height, colors }) => {
  const columns = selectedColumns[selectedFile] || [];

  const numericColumns = columns.filter((col) =>
    chartData.some((d) => typeof d[col] === "number" || !isNaN(Number(d[col])))
  );

  if (!chartData || numericColumns.length === 0) {
    return <p className="text-sm text-gray-500">📢 โปรดเลือกอย่างน้อย 1 คอลัมน์ตัวเลข</p>;
  }

  const plotData = numericColumns.map((col, i) => {
    const values = chartData
      .map((d) => Number(d[col]))
      .filter((v) => !isNaN(v));

    // ✅ ใช้สีจาก props.colors ถ้ามีการตั้งค่า ถ้าไม่มีก็ใช้ค่าเริ่มต้น
    const boxColor = colors?.[`colorSet${i}`] || `rgba(100, 100, 200, 0.6)`;
    const lineColor = boxColor.replace("0.6", "1.0");

    return {
      x: values,
      type: "box",
      name: col,
      orientation: "h",
      boxpoints: "outliers",
      marker: { color: boxColor },
      line: { color: lineColor },
    };
  });

  return (
    <div style={{ width: width - 40, height: height - 40, position: "relative" }}>
      {/* Force hide modebar via CSS */}
      <style>{`
        .js-plotly-plot .modebar {
          display: none !important;
        }
      `}</style>

      <Plot
        data={plotData}
        layout={{
          title: "📊 Box Plot แนวนอน (หลายคอลัมน์)",
          width: width - 40,
          height: height - 40,
          margin: { l: 60, r: 30, b: 40, t: 50 },
          xaxis: { title: "ค่าตัวเลข", zeroline: false },
          boxmode: "group",
        }}
        config={{
          responsive: true,
          displayModeBar: false, // ไม่ให้ Plotly แสดง modebar
        }}
      />
    </div>
  );
};

export default BoxPlotView;
