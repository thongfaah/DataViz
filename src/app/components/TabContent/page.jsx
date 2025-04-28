import { Space } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import HomeTab from "@/app/components-RibbonDP/HometabDP/page";
import TransformTab from "@/app/components-RibbonDP/TransformTabDP/page";
import View from "@/app/components-RibbonDP/View/page";
// components/TabContent.jsx
const TabContent = ({ activeTab }) => {
  
    switch (activeTab) {
      case "Home":
        return <HomeTab />;
      case "Transform":
        return <TransformTab/>;
      case "Add Column":
        return (
          <div className="space-x-2">
            <button className="btn">Zoom In</button>
            <button className="btn">Zoom Out</button>
          </div>
        );
      case "View":
        return <View/>;
      
      default:
        return null;
    }
  };
  
  export default TabContent;
  