"use client";

import React, { useMemo, useEffect, useState } from "react";
import TableView from "../TableView/page";
import PieChartView from "../Piechart/page";
import BarChartView from "../Barchart/page";
import LineChartView from "../linechart/page";
import TreeMapView from "../TreeMap/page";
import ScatterPlotView from "../ScatterPlot/page";
import BubbleChartView from "../BubbleChart/page";
import HistogramChartView from "../HistogramChart/page";
import BoxPlotView from "../Boxplot/page";
import AreaChartView from "../AreaChart/page";
import HeatmapView from "../Heatmap/page";

const ViewModeGraph = ({ viewMode, selectedFile, selectedColumns, data, width, height, colors }) => {

  useEffect(() => {
    console.log("📊 ViewModeGraph props:", {
      viewMode,
      selectedFile,
      selectedColumns,
      chartData,
    });
  }, [selectedFile, selectedColumns, data]);

    const chartData = selectedFile && data[selectedFile]?.rows
    ? data[selectedFile].rows.map((row) => {
        let newObj = { name: row[selectedColumns[selectedFile]?.[0]] || "" };
        selectedColumns[selectedFile]?.slice(1).forEach((col) => {
          newObj[col] = Number(row[col]) || 0;
        });
        return newObj;
      })
    : [];


  const pieData = useMemo(() => {
    if (
      !selectedFile ||
      !data[selectedFile]?.rows ||
      !selectedColumns[selectedFile] ||
      selectedColumns[selectedFile].length !== 2
    ) return [];
  
    return data[selectedFile].rows.map((row) => ({
      name: row[selectedColumns[selectedFile][0]],
      value: Number(row[selectedColumns[selectedFile][1]]),
      fill: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    }));
  }, [selectedFile, selectedColumns, data]);

  // const treeData = useMemo(() => {
  //   const grouped = {};
  //   const cols = selectedColumns[selectedFile];
  //   if (!selectedFile || !data[selectedFile]?.rows || !cols || cols.length < 2) return [];
  //   data[selectedFile].rows.forEach((row) => {
  //     const key = row[cols[0]] || "Unnamed";
  //     const value = Number(row[cols[1]]) || 0;
  //     grouped[key] = grouped[key] || { name: key, size: 0 };
  //     grouped[key].size += value;
  //   });
  //   return Object.values(grouped);
  // }, [selectedFile, selectedColumns, data]);

  const treeData = useMemo(() => {
    if (
      !selectedFile ||
      !data[selectedFile]?.rows ||
      !Array.isArray(selectedColumns[selectedFile]) ||
      selectedColumns[selectedFile].length < 2
    ) {
      return [];
    }
  
    const grouped = {};
    const cols = selectedColumns[selectedFile];
  
    data[selectedFile].rows.forEach((row) => {
      const key = row?.[cols[0]] ?? "Unnamed";
      const value = Number(row?.[cols[1]]) || 0;
      grouped[key] = grouped[key] || { name: key, size: 0 };
      grouped[key].size += value;
    });
  
    return Object.values(grouped);
  }, [selectedFile, selectedColumns, data]);

  // if (!selectedFile) return null;
  if (!selectedFile || !selectedColumns?.[selectedFile]) {
  return <div className="text-red-500 p-4">⚠️ กรุณาเลือกไฟล์และคอลัมน์ก่อนแสดงข้อมูล</div>;
}
 

  switch (viewMode) {
    case "bar":
      return <BarChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} colors={colors} />;
    case "pie":
      return <PieChartView pieData={pieData} width={width} height={height} colors={colors} />;
    case "line":
      return <LineChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} colors={colors} />;
    case "tree":
      return <TreeMapView treeData={treeData} width={width} height={height} />;
    case "scatter":
      return <ScatterPlotView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} />;
    case "bubble":
      return <BubbleChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} />;
    case "histogram":
      return <HistogramChartView data={chartData} dataKey={selectedColumns[selectedFile]?.[1] || ""} width={width} height={height} colors={colors}/>;
    case "boxplot":
      return <BoxPlotView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} colors={colors} />;
    case "area":
      return <AreaChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} colors={colors} />;
    case "heatmap":
      return <HeatmapView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} />;
    default:
      console.log("📋 Rendering TableView with data", data[selectedFile]?.rows?.length);
      return <TableView selectedFile={selectedFile} selectedColumns={selectedColumns} data={data} />;
  }
};

export default ViewModeGraph;
