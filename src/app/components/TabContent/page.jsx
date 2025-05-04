import { Space } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import View from '../../components-RibbonDP/View/page';
import HomeTab from '../../components-RibbonDP/HomeTab';
import TransformTab from '../../components-RibbonDP/TransformTab/page';
// components/TabContent.jsx

const TabContent = ({ activeTab }) => {
  
    switch (activeTab) {
      case "Home":
        return <HomeTab/>
      case "Transform":
        return <TransformTab/>
      case "Add Column":
        return (
          <div className="space-x-2">
            <button className="btn">Zoom In</button>
            <button className="btn">Zoom Out</button>
          </div>
        );
      case "View":
        return <View/>
      
      default:
        return null;
    }
  };
  
  export default TabContent;
  