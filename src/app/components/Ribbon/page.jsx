"use client";
import { useState } from "react";
import TabHeader from "../TabHeader/page";
import TabContent from "../TabContent/page";
const Ribbon = () => {
  const [activeTab, setActiveTab] = useState("Home"); // ควบคุมว่าเลือกแท็บไหนอยู่

  return (
    <div className="bg-gray-100 border-b">
      {/* Tab buttons */}
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab contents */}
      <div className="bg-white p-3">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Ribbon;