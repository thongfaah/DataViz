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
import Link from 'next/link';
import Test from '../Test/page';
import TextBox from '../TextManager/page';


const App = () => {
  const [activePanel, setActivePanel] = useState("edit");
  const [tables, setTables] = useState([]);
  const [elements, setElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const addTable = () => {
    setTables([...tables, { id: Date.now() }]); // เพิ่มตารางใหม่โดยสร้าง id ที่ไม่ซ้ำ
  };

  const addTextBox = () => {
    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'text',
        text: '',
        x: 100,
        y: 100,
      },
    ]);
  };

  const handleTextChange = (id, newText) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text: newText } : el))
    );
  };

  const handleDelete = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
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
    <div className=" ml-[5.5rem] " onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Toolbar activePanel={activePanel} setActivePanel={setActivePanel} />
      {/* <div className="absolute left-[10rem] top-[10rem]">
        <Test />
      </div> */}
      {activePanel === "edit" && <EditPanel />}
      {activePanel === "insert" && <InsertPanel addTable={addTable} addTextBox={addTextBox} />}
      {activePanel === "arrange" && <ArrangePanel />}
      {activePanel === "view" && <ViewPanel />}
      <div className="absolute top-[12rem] left-[10rem]">
        {elements.map((el) =>
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
      {/* <div className="absolute overfloe-hidden top-[9.5rem] w-full h-full ">
        {tables.map((table) => (
          <Test key={table.id} />
        ))}
      </div> */}
    </div>
  );
};

export default App;
