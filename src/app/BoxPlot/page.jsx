// components/BoxPlotView.jsx
import React from "react";
import Plot from "react-plotly.js";

const COLORS = [
  "rgba(100, 100, 200, 0.6)",
  "rgba(200, 100, 100, 0.6)",
  "rgba(100, 200, 100, 0.6)",
  "rgba(200, 200, 100, 0.6)",
  "rgba(100, 200, 200, 0.6)",
  "rgba(200, 100, 200, 0.6)"
];

const BoxPlotView = ({ chartData, selectedColumns, selectedFile, width, height }) => {
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

    return {
      x: values,
      type: "box",
      name: col,
      orientation: "h",
      boxpoints: "outliers",
      marker: { color: COLORS[i % COLORS.length] },
      line: { color: COLORS[i % COLORS.length].replace("0.6", "1.0") },
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
