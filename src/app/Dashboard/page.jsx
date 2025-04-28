"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/page";
import DashNav from '../dash-nav/page';
import Toolbar from '../Toolbar/page';
import EditPanel from '../EditPanel/page';
import InsertPanel from '../InsertPanel/page';
import ArrangePanel from '../ArrangePanel/page';
import ViewPanel from '../ViewPanel/page';
import NewTableManager from '../์NewTableManager/page';
import SelectColumnsPage from '../select-columns/page';
import { v4 as uuidv4 } from "uuid";
import TextBox from '../TextManager/page';


const App = () => {
  const [activePanel, setActivePanel] = useState("edit");
  // const [pageItems, setPageItems] = useState([]);
  const [elements, setElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [pages, setPages] = useState([[]]); // array of pageItems
  const [currentPage, setCurrentPage] = useState(0);
  const pageItems = pages[currentPage] || [];

  // const addTable = () => {
  //   setPageItems((prev) => [...prev, { id: Date.now(), type: "test" }]);
  // };

  const addTable = () => {
    const newItem = { id: Date.now(), type: "test" };

    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = [...updated[currentPage], newItem];
      return updated;
    });
  };

  

  const addTextBox = () => {
    const newItem = {
      id: Date.now(),
      type: 'text',
      text: '',
      x: 100,
      y: 100,
    };
  
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = [...updated[currentPage], newItem]; // ✅ newItem อยู่ใน scope นี้
      return updated;
    });
  };

  const handleTextChange = (id, newText) => {
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map(el =>
        el.id === id ? { ...el, text: newText } : el
      );
      return updated;
    });
  };

  const handleDelete = (id) => {
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].filter(el => el.id !== id);
      return updated;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && draggedElement !== null) {
        handleDelete(draggedElement);
        setDraggedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [draggedElement]);

  const handleMouseMove = (e) => {
    if (draggedElement !== null) {
      setElements((prev) =>
        prev.map((el) =>
          el.id === draggedElement
            ? { ...el, x: e.clientX - 50, y: e.clientY - 10 }
            : el
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
  };

  const startDragging = (id) => {
    setDraggedElement(id);
  };

  return (
    <div className=" ml-[5.5rem] z-0" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Toolbar 
      activePanel={activePanel} 
      setActivePanel={setActivePanel} 
      pages={pages}
      setPages={setPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
      />

      {activePanel === "edit" && <EditPanel />}
      {activePanel === "insert" && <InsertPanel addTable={addTable} addTextBox={addTextBox} />}
      {activePanel === "arrange" && <ArrangePanel />}
      {activePanel === "view" && <ViewPanel />}

      👇 เพิ่ม CanvasArea ตรงนี้
    {/* <CanvasArea pageItems={pageItems} /> */}
      <div className="absolute top-[12rem] left-[10rem]">
      

        {pages[currentPage]?.map((el) =>
          el.type === 'text' ? (
            <TextBox
              key={el.id}
              text={el.text}
              onChange={(newText) => handleTextChange(el.id, newText)}
              style={{ top: el.y, left: el.x }}
              onDrag={() => startDragging(el.id)}
              onDelete={() => handleDelete(el.id)}
            />
          ) : null
        )}
      </div>

      {/* {tables.map((table) => (
        <Test key={table.id} />
      ))} */}
      
    </div>
  );
};

export default App;
