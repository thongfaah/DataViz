import React, { useRef, useState, useEffect } from "react";
import Plot from "react-plotly.js";

const HeatmapView = ({ chartData, selectedColumns, selectedFile }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 500, height: 400 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const xKey = selectedColumns[selectedFile]?.[0];
  const yKey = selectedColumns[selectedFile]?.[1];
  const valueKey = selectedColumns[selectedFile]?.[2];
  const ready = xKey && yKey && valueKey;

  // const xLabels = [...new Set(chartData.map((d) => d[xKey]))];
  // const yLabels = [...new Set(chartData.map((d) => d[yKey]))];
  const xLabels = [...new Set(chartData.map((d) => String(d[xKey])))].sort();
const yLabels = [...new Set(chartData.map((d) => String(d[yKey])))].sort();
  // const zData = yLabels.map((y) =>
  //   xLabels.map((x) => {
  //     const match = chartData.find((d) => d[xKey] === x && d[yKey] === y);
  //     return match ? Number(match[valueKey]) : null;
  //   })
  // );
  const zData = yLabels.map((y) =>
    xLabels.map((x) => {
      const match = chartData.find(
        (d) => String(d[xKey]) === x && String(d[yKey]) === y
      );
      return match && !isNaN(Number(match[valueKey]))
        ? Number(match[valueKey])
        : 0; // หรือ null ถ้าอยากเว้นว่าง
    })
  );

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {!ready ? (
        <p className="text-sm text-gray-500">
          📊 กรุณาเลือกคอลัมน์ 3 คอลัมน์เพื่อสร้าง Heatmap (X, Y, Value)
        </p>
      ) : (
        <Plot
          data={[
            {
              z: zData,
              x: xLabels,
              y: yLabels,
              type: "heatmap",
              colorscale: "YlGnBu",
              hoverongaps: false,
              hovertemplate:
                "แนวนอน: %{x}<br>แนวตั้ง: %{y}<br>ค่า: %{z}<extra></extra>",
            },
          ]}
          layout={{
            width: size.width,
            height: size.height,
            margin: { t: 50, l: 80, r: 20, b: 60 },
            autosize: true,
          }}
          config={{ responsive: true, displayModeBar: false,  }}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler
        />
      )}
    </div>
  );
};

export default HeatmapView;
