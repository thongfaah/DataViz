
"use client";

import React, { useRef, useEffect } from "react";
import Moveable from "react-moveable";
import ViewModeGraph from "../viewgraph/page";

const ChartBox = ({
  isLocked,
  selectedFile,
  selectedColumns,
  data,
  viewMode,
  posX = 0,
  posY = 0,
  width = 400,
  height = 300,
  isActive,
  chartId,
  onSelect,
  onUpdatePosition,
  onUpdateSize,
  filterData
}) => {
  const targetRef = useRef(null);
  // const posRef = useRef({ x: initialX, y: initialY });
  const sizeRef = useRef({ width, height });

  useEffect(() => {
    const el = targetRef.current;
    if (el) {
      // el.style.transform = `translate(${posX}px, ${posY}px)`;
      // el.style.width = `${width}px`;
      // el.style.height = `${height}px`;
      el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.position = "absolute";
    }
  }, [posX, posY, width, height]);

  

  const handleDataUpdate = (newData) => {
    if (onUpdateData) {
      console.log("📌 [ChartBox] Sending Updated Data to CanvasArea:", newData);
  
      if (Array.isArray(newData) && newData.length > 0) {
        onUpdateData(newData);  // ✅ อัปเดตข้อมูลกลับไปที่ CanvasArea
      } else {
        console.error("❌ ข้อมูลที่ส่งกลับไป CanvasArea ว่างหรือไม่ใช่ Array");
      }
    }
  };
  
  const loadData = async () => {
    try {
      console.log("📌 [ChartBox] กำลังดึงข้อมูลจาก API:", selectedFile);

      const response = await fetch(`/api/get-data?file=${selectedFile}`);
      const result = await response.json();

      if (result && result.data) {
        console.log("📌 [ChartBox] Data Loaded from CSV:", result.data);

        if (result.data.length > 0) {
          console.log("📌 [ChartBox] ส่งข้อมูลไปที่ CanvasArea:", result.data);
          onUpdateData(result.data); // ✅ ส่งข้อมูลกลับไปที่ CanvasArea
        } else {
          console.warn("⚠️ ข้อมูลที่โหลดมาว่าง");
        }
      }
    } catch (err) {
      console.error("❌ Error loading data:", err);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      loadData();
    }
  }, [selectedFile]);

  // const handleColumnChange = (newColumns) => {
  //   const newData = data.filter(row => newColumns.every(col => row[col] !== undefined));
  //   console.log("📌 [ChartBox] Column Changed Data:", newData);
  //   handleDataUpdate(newData);  // ✅ ส่งข้อมูลกลับไปที่ CanvasArea
  // };

  useEffect(() => {
    if (filterData) {
        const { column, operator, value } = filterData;
        let filteredData = chartData;

        if (operator === 'Equals') {
            filteredData = chartData.filter(item => item[column] === value);
        } else if (operator === 'Greater Than') {
            filteredData = chartData.filter(item => item[column] > value);
        } else if (operator === 'Less Than') {
            filteredData = chartData.filter(item => item[column] < value);
        } else if (operator === 'Contains') {
            filteredData = chartData.filter(item => item[column].includes(value));
        }

        setChartData(filteredData);
    }
}, [filterData])

  return (
    <>
      <div
        ref={targetRef}
        className="absolute chartbox-wrapper"
        data-id={chartId}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: `${posX}px`,
          top: `${posY}px`,
          width: `${width}px`,
          height: `${height}px`,
          minWidth: "150px",
          minHeight: "100px",
          // zIndex: isActive ? 999 : 1,
          backgroundColor: "transparent",
          border: isActive ? "1px solid #007aff" : "1px solid transparent",
          padding: "8px",
          boxSizing: "border-box",
          willChange: "transform, width, height",
          transition: "all 0.3s ease",
        }}
      >
        <div className="w-full h-full bg-white shadow-sm p-2 overflow-hidden">
          <ViewModeGraph
            viewMode={viewMode}
            selectedFile={selectedFile}
            selectedColumns={selectedColumns}
            data={data}
            width={sizeRef.current.width}
            height={sizeRef.current.height}
          />
        </div>
      </div>

      {isActive && (
        // <Moveable
        //   target={targetRef.current}
        //   draggable={!isLocked}
        //   resizable={!isLocked}
        //   keepRatio={false}
        //   throttleDrag={0}
        //   throttleResize={0}
        //   onDrag={({ beforeTranslate }) => {
        //     if (onUpdatePosition) {
        //       onUpdatePosition(chartId, beforeTranslate[0], beforeTranslate[1]);
        //     }
        //   }}
        //   onResize={({ width, height, drag }) => {
        //     if (onUpdatePosition) {
        //       onUpdatePosition(chartId, drag.beforeTranslate[0], drag.beforeTranslate[1]);
        //     }
        //     if (onUpdateSize) {
        //       onUpdateSize(chartId, width, height);
        //     }
        //   }}
        // />

        <Moveable
          target={targetRef.current}
          draggable={!isLocked}
          resizable={!isLocked}
          keepRatio={false}
          throttleDrag={0}
          throttleResize={0}
          renderDirections={["nw", "ne", "sw", "se", "n", "w", "s", "e"]}
          onDrag={({ beforeTranslate }) => {
            if (onUpdatePosition) {
              onUpdatePosition(chartId, beforeTranslate[0], beforeTranslate[1]);
            }
          }}
          onResize={({ width, height, drag }) => {
            if (onUpdatePosition) {
              onUpdatePosition(chartId, drag.beforeTranslate[0], drag.beforeTranslate[1]);
            }
            if (onUpdateSize) {
              onUpdateSize(chartId, width, height);
            }
          }}
          cssStyled={{ transition: "all 0.3s ease" }}
        />
        
      )}
    </>
  );
};

export default ChartBox;


