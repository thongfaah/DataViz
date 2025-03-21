"use client"

import React, { useState, useRef, useEffect } from 'react'
import Sidebar from "../Sidebar/page";
import DashNav from '../dash-nav/page';
import Toolbar from '../Toolbar/page';
import EditPanel from '../EditPanel/page';
import InsertPanel from '../InsertPanel/page';
import ArrangePanel from '../ArrangePanel/page';
import ViewPanel from '../ViewPanel/page';
import NewTableManager from '../์NewTableManager/page';
import SelectColumnsPage from '../select-columns/page';
import Link from 'next/link'
import Test from '../Test/page';

// TextBox Component
// const TextBox = ({ text, onChange, style, onDrag }) => {
//   return (
//     <div className="absolute" style={style} onMouseDown={onDrag}>
//       <textarea
//         value={text}
//         onChange={(e) => onChange(e.target.value)}
//         className="bg-white border p-2 resize-none shadow-lg cursor-move"
//       />
//     </div>
//   );
// };

const App = () => {
  const [activePanel, setActivePanel] = useState("edit");
  const [tables, setTables] = useState([]); // State เก็บกล่องที่เพิ่ม

  // ฟังก์ชันเพิ่มกล่องใหม่
  const addTable = () => {
    setTables([...tables, { id: Date.now() }]);
  };
//   const [elements, setElements] = useState([]);
//   const [draggedElement, setDraggedElement] = useState(null);

//   const addTextBox = () => {
//     setElements((prev) => [
//       ...prev,
//       {
//         type: 'text',
//         text: '',
//         x: 100,
//         y: 100,
        
//       },
//     ]);
//   };

//   const handleTextChange = (index, newText) => {
//     setElements((prev) =>
//       prev.map((el, i) =>
//         i === index ? { ...el, text: newText } : el
//       )
//     );
//   };

//   const handleDelete = () => {
//     setElements((prev) => prev.slice(0, -1));
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Delete') {
//         handleDelete();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   const handleMouseMove = (e) => {
//     if (draggedElement !== null) {
//       const { index, offsetX, offsetY } = draggedElement;
//       setElements((prev) =>
//         prev.map((el, i) =>
//           i === index
//             ? { ...el, x: e.clientX - offsetX, y: e.clientY - offsetY }
//             : el
//         )
//       );
//     }
//   };

//   const handleMouseUp = () => {
//     setDraggedElement(null);
//   };

//   const startDragging = (index, e) => {
//     const rect = e.target.getBoundingClientRect();
//     setDraggedElement({
//       index,
//       offsetX: e.clientX - rect.left,
//       offsetY: e.clientY - rect.top,
//     });
//   };

  return (
    // <div
    //   className="p-4"
    //   onMouseMove={handleMouseMove}
    //   onMouseUp={handleMouseUp}
    // >
      
    //   <div className="ml-40 pt-[9rem]">
    //     <Toolbar onAddText={addTextBox} />

        // <div className="absolute ">
        //   <Test />
        // </div>

    //     <div className="relative ">
    //       {elements.map((el, index) =>
    //         el.type === 'text' ? (
    //           <TextBox
    //             key={index}
    //             text={el.text}
    //             onChange={(newText) => handleTextChange(index, newText)}
    //             style={{ top: el.y, left: el.x }}
    //             onDrag={(e) => startDragging(index, e)}
    //           />
    //         ) : null
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="ml-[5.5rem] ">
      {/* Toolbar */}
      <Toolbar activePanel={activePanel} setActivePanel={setActivePanel} />

      <div className="absolute left-[10rem] top-[10rem]">
          <Test />
      </div>
      

      {/* Active Panels */} 
     
      {activePanel === "edit" && <EditPanel addTable={addTable} />}
      {activePanel === "insert" && <InsertPanel />}
      {activePanel === "arrange" && <ArrangePanel />}
      {activePanel === "view" && <ViewPanel />}

      <div className="grid gap-4 p-4">
        {tables.map((table) => (
          <NewTableManager key={table.id} />
        ))}
      </div>
      
    </div>

  );
};

export default App;

