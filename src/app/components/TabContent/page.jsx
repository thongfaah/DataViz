import React from "react";
import View from '../../components-RibbonDP/View/page';
import HomeTab from '../../components-RibbonDP/HomeTab';
import TransformTab from '../../components-RibbonDP/TransformTab';
import AddColumnTab from "../../components-RibbonDP/AddColumnTab";
// components/TabContent.jsx

const TabContent = ({ activeTab }) => {
  
    switch (activeTab) {
      case "Home":
        return <HomeTab/>
      case "Transform":
        return <TransformTab/>
      case "Add Column":
        return <AddColumnTab/>
      case "View":
        return <View/>
      
      default:
        return null;
    }
  };
  
  export default TabContent;
  