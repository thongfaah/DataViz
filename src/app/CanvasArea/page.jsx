
"use client";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import TextBox from "../TextManager/page";
import ChartBox from "../ChartBox/page";
import SidebarText from "../SidebarText/page";
import SidebarShape from "../SidebarShape/page";
import { Rnd } from "react-rnd";

const CanvasArea = forwardRef(({
  pages,
  pageItems,
  setPages,
  currentPage,
  reportId,
  zoomLevel,
  showGrid,
  isLocked,
  handleTextChange,
  handleDelete,
  selectedColumns,
  selectedFile,
  data,
  selectedItemIds,
  setSelectedItemIds,
  onBringForward,
  onSendBackward,
  onGroup,
  onUngroup,
  onAlign,
  onCopy,
  onCut,
  onPaste,
  onDelete,
  onSelectAll,
  setSelectedChartId,
}, ref) => {
  
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
 
  const selectedTextItem = pageItems.find(item =>
    selectedItemIds.length === 1 && item.id === selectedItemIds[0] && item.type === "text"
  );

  const saveState = async (newPages) => {
    if (!reportId) return;
  
    setPages(newPages);
  
    try {
      await fetch(`/api/getReport/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pages: newPages }),
      });
  
      console.log("Report updated successfully.");
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const updateTextItem = (field, value) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map((item) => {
        if (selectedItemIds.length === 1 && item.id === selectedItemIds[0] && item.type === "text") {
          return { ...item, [field]: value };
        }
        return item;
      });
      return updated;
    });
  };

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedItemIds.length > 0) {
        setPages((prev) => {
          const updated = [...prev];
          updated[currentPage] = updated[currentPage].filter(item => !selectedItemIds.includes(item.id));
          return updated;
        });
        setSelectedItemIds([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIds, setPages, currentPage]);

  const selectedShapeItem = pageItems.find(
    (item) =>
      selectedItemIds.length === 1 &&
      item.id === selectedItemIds[0] &&
      ["line", "arrow", "curve-line"].includes(item.type)
  );
  
  const updateShapeItem = (field, value) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map((item) =>
        selectedItemIds.length === 1 && item.id === selectedItemIds[0]
          ? { ...item, [field]: value }
          : item
      );
      return updated;
    });
  };

  // const getStrokeDasharray = (style) => {
  //   switch (style) {
  //     case "dashed": return "6,4";
  //     case "dotted": return "2,2";
  //     default: return "none";
  //   }
  // };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement.tagName;
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.contentEditable === 'true';
      if (isEditing) return;
      
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault(); onCopy();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault(); onCut();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault(); onPaste();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault(); onSelectAll();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault(); onDelete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCopy, onCut, onPaste, onDelete, onSelectAll]);

  const getGroupItems = (groupId) => {
    return pageItems.filter(item => item.groupId === groupId);
  };
  
  const handleClick = (id, type) => {
    if (type === "table") {
      console.log("📌 เลือกตาราง ID:", id);
    console.log("📌 Current Page Data:", pages[currentPage]);
      setSelectedChartId(id);  // อัปเดต ID ที่เลือก
    }
  };

  const updateChartData = (id, newData) => {
    console.log("📌 [CanvasArea] Update Chart Data for ID:", id);
    console.log("📌 [CanvasArea] New Data Received:", newData);

    if (!Array.isArray(newData) || newData.length === 0) {
      console.error("❌ ข้อมูลที่ส่งมาไม่ถูกต้อง ไม่สามารถเขียนกลับไปที่ pages ได้");
      return;
    }

    setPages((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[currentPage] = updated[currentPage].map(item =>
        item.id === id ? { ...item, chartData: newData } : item
      );

      console.log("📌 [CanvasArea] Updated Pages with chartData:", updated[currentPage]);
      return updated;
    });
  };
  

  return (
    <>
      <div
        ref={ref}
        id="canvas-area"
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
        }}
        onClick={(e) => {
          // ล้าง selection และซ่อน context menu
          if (e.target.id === "canvas-area") {
            setSelectedItemIds([])
          }
          setContextMenu({ visible: false, x: 0, y: 0 });
        }}
        className={`relative overflow-auto border-gray-200 border-2 ${showGrid ? "bg-grid" : "bg-white"}`}
        style={{
          top: "9.8rem",
          left: "5.5rem",
          right: "15rem",
          bottom: "3.7rem",
          position: "fixed",
        }}
      >
        <div
        //  ref={ref}
          style={{
            // transform: `scale(${zoomLevel})`,
            // transformOrigin: "top left",
            zoom: zoomLevel, 
            width: "fit-content",
            minHeight: "500px",        // สูงขั้นต่ำ
            padding: "20px",  
                   // เผื่อ margin รอบขอบ ไม่ให้เนื้อหาชิดขอบ
          }}
        >
        
          {pageItems.length === 0 ? (
            <p className="text-lg text-gray-600 p-4 ">เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
          ) : (
            pageItems.map((item) => {
              if (item.type === "chartbox") {
                return (
                  <ChartBox
                    key={item.id}
                    chartId={item.id}
                    isLocked={isLocked}
                    selectedFile={selectedFile}
                    selectedColumns={selectedColumns}
                    data={data}
                    viewMode={item.viewMode}
                    posX={item.posX}
                    posY={item.posY}
                    width={item.width}
                    height={item.height}
                    isActive={selectedItemIds.includes(item.id)}
                    chartData={item.chartData}
                    onSelect={() => {
                      setSelectedItemIds([item.id]);
                      if (item.viewMode === "table") {
                        setSelectedChartId(item.id); // ✅ อัปเดต ID ของตาราง
                      }
                    }}
                    onUpdateData={(newData) => updateChartData(item.id, newData)}
                    onUpdatePosition={(id, x, y) => {
                      setPages((prev) => {
                        const updated = JSON.parse(JSON.stringify(prev));
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                        
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === id ? { ...el, posX: x, posY: y } : el
                        );
                    
                        saveState(updated);
                        return updated;
                      });
                    }}
                    
                    onUpdateSize={(id, width, height) => {
                      setPages((prev) => {
                        const updated = JSON.parse(JSON.stringify(prev));
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                    
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === id ? { ...el, width, height } : el
                        );
                    
                        saveState(updated);
                        return updated;
                      });
                    }}
                    
                  />
                );
              }

              if (item.type === "text") {
                return (
                  <TextBox
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    posX={item.posX}
                    posY={item.posY}
                    width={item.width || 200}
                    height={item.height || 100}
                    isSelected={selectedItemIds.includes(item.id)}
                    onSelect={() => setSelectedItemIds([item.id])}
                    onChange={(newText) => handleTextChange(item.id, newText)}
                    onDelete={() => handleDelete(item.id)}
                    onUpdatePosition={(id, x, y) => {
                      setPages((prev) => {
                        const updated = JSON.parse(JSON.stringify(prev));
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                        
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === id ? { ...el, posX: x, posY: y } : el
                        );
                    
                        saveState(updated);
                        return updated;
                      });
                    }}
                    
                    onUpdateSize={(id, width, height) => {
                      setPages((prev) => {
                        const updated = JSON.parse(JSON.stringify(prev));
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                    
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === id ? { ...el, width, height } : el
                        );
                    
                        saveState(updated);
                        return updated;
                      });
                    }}
                    
                    style={item.style}
                  />
                );
              }

              if (item.type === "square" || item.type === "circle") {
                return (
                  <Rnd
                    key={item.id}
                    size={{
                      width: item.width || 100,
                      height: item.height || 100,
                    }}
                    position={{
                      x: item.posX || 0,
                      y: item.posY || 0,
                    }}
                    onDragStop={(e, d) => {
                      setPages((prev) => {
                        // ✅ Deep Clone ก่อนแก้ไข
                        const updated = JSON.parse(JSON.stringify(prev));
                        
                        // ✅ เช็คว่า currentPage มีค่าอยู่หรือไม่
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                    
                        // ✅ แก้ไขตำแหน่งของ Item
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === item.id ? { ...el, posX: d.x, posY: d.y } : el
                        );
                    
                        // ✅ บันทึก State ใหม่
                        saveState(updated);
                    
                        return updated;
                      });
                    }}
                    
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setPages((prev) => {
                        // ✅ Deep Clone
                        const updated = JSON.parse(JSON.stringify(prev));
                        
                        if (!updated[currentPage]) {
                          updated[currentPage] = [];
                        }
                    
                        // ✅ แก้ไขขนาดและตำแหน่งใหม่
                        updated[currentPage] = updated[currentPage].map(el =>
                          el.id === item.id
                            ? {
                                ...el,
                                width: parseInt(ref.style.width, 10),
                                height: parseInt(ref.style.height, 10),
                                posX: position.x,
                                posY: position.y,
                              }
                            : el
                        );
                    
                        // ✅ บันทึก State ใหม่
                        saveState(updated);
                    
                        return updated;
                      });
                    }}
                    
                    onClick={() => setSelectedItemIds([item.id])}
                    style={{
                      backgroundColor: "#E3E3E3",
                      border: selectedItemIds.includes(item.id) ? "2px solid blue" : "1px solid black",
                      borderRadius: item.type === "circle" ? "50%" : "0.25rem",
                    }}
                  />
                );
              }

             // ✅ Line, Arrow, Curve
             if (item.type === "line" || item.type === "arrow" || item.type === "curve-line") {
              return (
                <Rnd
                  key={item.id}
                  size={{ width: item.width || 120, height: item.height || 100 }}
                  position={{ x: item.posX || 0, y: item.posY || 0 }}
                  style={{
                    border: selectedItemIds.includes(item.id) ? "2px dashed #3B82F6" : "none",
                    borderRadius: "0.5rem",
                    padding: "2px",
                  }}
                  onDragStop={(e, d) => {
                    setPages((prev) => {
                      // ✅ Deep Clone ก่อนแก้ไข
                      const updated = JSON.parse(JSON.stringify(prev));
                      
                      // ✅ เช็คว่า currentPage มีค่าอยู่หรือไม่
                      if (!updated[currentPage]) {
                        updated[currentPage] = [];
                      }
                  
                      // ✅ แก้ไขตำแหน่งของ Item
                      updated[currentPage] = updated[currentPage].map(el =>
                        el.id === item.id ? { ...el, posX: d.x, posY: d.y } : el
                      );
                  
                      // ✅ บันทึก State ใหม่
                      saveState(updated);
                  
                      return updated;
                    });
                  }}

                 onResizeStop={(e, direction, ref, delta, position) => {
                    setPages((prev) => {
                      // ✅ Deep Clone
                      const updated = JSON.parse(JSON.stringify(prev));
                      
                      if (!updated[currentPage]) {
                        updated[currentPage] = [];
                      }

                      // ✅ แก้ไขขนาดและตำแหน่งใหม่
                      updated[currentPage] = updated[currentPage].map(el =>
                        el.id === item.id
                          ? {
                              ...el,
                              width: parseInt(ref.style.width, 10),
                              height: parseInt(ref.style.height, 10),
                              posX: position.x,
                              posY: position.y,
                            }
                          : el
                      );

                      // ✅ บันทึก State ใหม่
                      saveState(updated);

                      return updated;
                    });
                  }}
                  onClick={() => setSelectedItemIds([item.id])}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${item.width || 120} ${item.height || 100}`}
                    preserveAspectRatio="none"
                  >
                    {/* Normal Line */}
                    {item.type === "line" && (
                      <line
                      x1="0"
                      y1="0"
                      x2={item.width}
                      y2={item.height}
                      stroke={item.strokeColor || "black"}
                      strokeWidth={item.strokeWidth || 2}
                      />
                    )}
            
                    {/* 🟦 Arrow (using path) */}
                    {item.type === "arrow" && (() => {
                      const x1 = 0;
                      const y1 = 0;
                      const x2 = item.width || 100;
                      const y2 = item.height || 100;
                      const angle = Math.atan2(y2 - y1, x2 - x1);

                      // ระยะของหัวลูกศร
                      const arrowSize = 10;

                      // คำนวณตำแหน่งหัวลูกศร
                      const arrowX1 = x2 - arrowSize * Math.cos(angle - Math.PI / 6);
                      const arrowY1 = y2 - arrowSize * Math.sin(angle - Math.PI / 6);
                      const arrowX2 = x2 - arrowSize * Math.cos(angle + Math.PI / 6);
                      const arrowY2 = y2 - arrowSize * Math.sin(angle + Math.PI / 6);

                      return (
                        <>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
                          <polygon
                            points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
                            fill="black"
                          />
                        </>
                      );
                    })()}
            
                    {/* 🟩 Curve Line */}
                    {item.type === "curve-line" && (
                      <path
                        d={`
                          M0,${item.height || 100}
                          C${(item.width || 120) / 2},0
                           ${(item.width || 120) / 2},0
                           ${item.width || 120},${item.height || 100}
                        `}
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                        pointerEvents="none"
                      />
                    )}
                  </svg>
                </Rnd>
              );
            }
            
              return null;
            })
          )}
        </div>
      </div>

      {selectedTextItem && (
        <SidebarText
          size={selectedTextItem.size || "20"} setSize={(v) => updateTextItem("size", v)}
          font={selectedTextItem.font || "Arial"} setFont={(v) => updateTextItem("font", v)}
          color={selectedTextItem.color || "#000000"} setColor={(v) => updateTextItem("color", v)}
          fade={selectedTextItem.fade || "100%"} setFade={(v) => updateTextItem("fade", v)}
          isBold={selectedTextItem.isBold || false} setIsBold={(v) => updateTextItem("isBold", v)}
          isItalic={selectedTextItem.isItalic || false} setIsItalic={(v) => updateTextItem("isItalic", v)}
          isUnderline={selectedTextItem.isUnderline || false} setIsUnderline={(v) => updateTextItem("isUnderline", v)}
          textAlign={selectedTextItem.textAlign || "left"} setTextAlign={(v) => updateTextItem("textAlign", v)}
          backgroundColor={selectedTextItem.backgroundColor || "#ffffff"} setBackgroundColor={(v) => updateTextItem("backgroundColor", v)}
          borderColor={selectedTextItem.borderColor || "#000000"} setBorderColor={(v) => updateTextItem("borderColor", v)}
          borderRadius={selectedTextItem.borderRadius || "0"} setBorderRadius={(v) => updateTextItem("borderRadius", v)}
          borderWeight={selectedTextItem.borderWeight || "1"} setBorderWeight={(v) => updateTextItem("borderWeight", v)}
          borderStyle={selectedTextItem.borderStyle || "Solid"} setBorderStyle={(v) => updateTextItem("borderStyle", v)}
        />
      )}

      {contextMenu.visible && (
        <ul
          className="absolute z-50 bg-white shadow-md border rounded w-[180px] text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
        >
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onCopy}>Copy</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onCut}>Cut</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onPaste}>Paste</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onSelectAll}>Select All</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onDelete}>Delete</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onBringForward()}>Bring Forward</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSendBackward()}>Send Backward</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={onGroup}>Group</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAlign("left")}>Align Left</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAlign("right")}>Align Right</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAlign("top")}>Align Top</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAlign("bottom")}>Align Bottom</li>
          {/* <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer" onClick={() => handleDelete(selectedItemId)}>Delete</li> */}
        </ul>
      )}

{selectedShapeItem && (
  <SidebarShape item={selectedShapeItem} updateShapeItem={updateShapeItem} />
)}
   
    </>
);
});

CanvasArea.displayName = "CanvasArea";
export default CanvasArea;

