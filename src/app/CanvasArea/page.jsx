"use client";

import React,{ useState} from "react";
import Test from "../Test/page";

const CanvasArea = ({ pageItems}) => {

  return (

    <div
        className="relative bg-white overflow-auto border-gray-200 border-2"
        style={{
          top: "9.8rem",
          left: "5.5rem",
          right: "9.5rem",
          bottom: "3.7rem",
          gap: "1rem",
          alignItems: "start",
          position: "fixed",
        }}
      >
        {pageItems.length === 0 ? (
          <p className="text-lg text-gray-600 p-4">เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
        ) : (
          pageItems.map((item) =>
            item.type === "test" ? (
              // <Test key={item.id} defaultX={item.posX} defaultY={item.posY} />
              <Test key={item.id} initialX={item.posX} initialY={item.posY} />
            ) : null
          )
        )}
      </div>
  );
};

export default CanvasArea;