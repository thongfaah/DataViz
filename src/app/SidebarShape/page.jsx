"use client";
import React from "react";

const SidebarShape = ({ item, updateShapeItem }) => {
  if (!item) return null;

  return (
    <div className="fixed right-0 top-[7rem] w-64 bg-white shadow-lg border-l px-4 py-6 z-50">
      <h2 className="text-lg font-semibold mb-4 text-[#2B3A67]">Shape Settings</h2>

      {/* Stroke Color */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Stroke Color</label>
        <input
          type="color"
          value={item.strokeColor || "#000000"}
          onChange={(e) => updateShapeItem("strokeColor", e.target.value)}
          className="w-full h-10 p-1 border rounded"
        />
      </div>

      {/* Stroke Width */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Stroke Width</label>
        <input
          type="range"
          min="1"
          max="10"
          value={item.strokeWidth || 2}
          onChange={(e) => updateShapeItem("strokeWidth", parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-500">{item.strokeWidth || 2}px</p>
      </div>

      {/* Stroke Style */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Line Style</label>
        <select
          value={item.strokeStyle || "solid"}
          onChange={(e) => updateShapeItem("strokeStyle", e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

      {/* Arrow Head Shape */}
      {item.type === "arrow" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">Arrow Head</label>
          <select
            value={item.arrowHead || "triangle"}
            onChange={(e) => updateShapeItem("arrowHead", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="triangle">Triangle</option>
            <option value="block">Block</option>
            <option value="sharp">Sharp</option>
          </select>
        </div>
      )}

      {/* Rotation */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Rotation (deg)</label>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={item.rotation || 0}
          onChange={(e) => updateShapeItem("rotation", parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-500">{item.rotation || 0}°</p>
      </div>
    </div>
  );
};

export default SidebarShape;
