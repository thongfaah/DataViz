
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Toolbar from "../Toolbar/page";
import InsertPanel from "../InsertPanel/page";
import ArrangePanel from "../ArrangePanel/page";
import ViewPanel from "../ViewPanel/page";
import EditPanel from "../EditPanel/page";
import CanvasArea from "../CanvasArea/page";
import SidebarData from "../Sidebar-data/page";
import { useSearchParams, useRouter } from "next/navigation";

const App = () => {
  const [activePanel, setActivePanel] = useState("edit");
  const [pages, setPages] = useState([[]]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");
  const [report, setReport] = useState(null);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  // Shared state for data
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [data, setData] = useState({});
  const [selectedColumns, setSelectedColumns] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode] = useState("table");
  const [selectedChartId, setSelectedChartId] = useState(null);
  // const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [clipboard, setClipboard] = useState(null);
  const [reportName, setReportName] = useState("Untitled Report");
  const router = useRouter();

  const canvasRef = useRef(null);
  const pageItems = pages[currentPage] || [];


  // ✅ 2️⃣ สร้าง Report ใหม่ถ้าไม่พบ reportId
  useEffect(() => {
    const createReport = async () => {
      if (!session || reportId) return;
  
      try {
        const res = await fetch('/api/getReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            title: 'Untitled Report',
            description: '',
            content: [],
          })
        });
  
        if (res.ok) {
          const newReport = await res.json();
          setReport(newReport);
          setReportName(data.title); 
          router.replace(`/Dashboard?id=${newReport._id}`); 
          // ✅ อัปเดต reportId ด้วยค่าใหม่
          localStorage.setItem("reportId", newReport._id);
        } else {
          console.error("Failed to create report");
        }
      } catch (err) {
        console.error('Failed to create report', err);
      }
    };
  
    createReport();
  }, [session, reportId]);


  useEffect(() => {
    const storedData = localStorage.getItem(`report-${reportId}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPages(parsedData.content);
      setReportName(parsedData.title);
    } else {
      console.log("🚫 No stored data found for this report.");
    }
  }, [reportId]);

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) return;

      try {
        const res = await fetch(`/api/getReport/${reportId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReport(data);
          if (data.content.length > 0) {
            setPages(data.content); // ✅ โหลด content ที่เคยบันทึกไว้
          }
        } else {
          console.error("❌ Error fetching report:", res.status);
        }
      } catch (error) {
        console.error("❌ Failed to fetch report:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  useEffect(() => {
    if (!reportId) {
      const storedReportId = localStorage.getItem("reportId");
      if (storedReportId) {
        router.replace(`/Dashboard?id=${storedReportId}`);
      }
    }
  }, [reportId]);

useEffect(() => {
  if (!report) return;

  const saveReport = async () => {
    try {
      await fetch(`/api/getReport/${report._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          content: pages,
        }),
      });
    } catch (error) {
      console.error("❌ Error saving report:", error);
    }
  };

  saveReport();
}, [pages]);



  // ⏳ โหลดข้อมูลจาก LocalStorage
  useEffect(() => {
    const savedPages = localStorage.getItem("dashboard_pages");
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    }
  }, []);

  // 💾 บันทึกข้อมูลลง LocalStorage เมื่อ pages เปลี่ยน
  useEffect(() => {
    localStorage.setItem("dashboard_pages", JSON.stringify(pages));
  }, [pages]);

  // ✅ ฟังก์ชัน Undo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack.pop();
      setRedoStack((prev) => [pages, ...prev]);
      setPages(prevState);
    }
  };

  // ✅ ฟังก์ชัน Redo
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setUndoStack((prev) => [...prev, pages]);
      setPages(nextState);
    }
  };

  // ✅ ฟังก์ชัน Save State
  const saveState = async (newPages) => {
  if (!newPages) return;
  if (!reportId) {
    console.error("❌ reportId not found, cannot save state.");
    return;
  }
  
  setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(pages))]);
  setPages(newPages);
  setRedoStack([]);
  localStorage.setItem("dashboard_pages", JSON.stringify(newPages));
  
  try {
    await fetch(`/api/getReport/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        content: newPages,
      }),
    });
    console.log("✅ State saved successfully!");
  } catch (error) {
    console.error("❌ Failed to save state:", error);
  }
};

  // ✅ ฟังก์ชัน Add Item
  const addItem = (item) => {
    const newPages = [...pages];
    newPages[currentPage] = [...newPages[currentPage], item];
    saveState(newPages);
  };

  // ✅ ฟังก์ชันดึงข้อมูลจาก Server
  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/list-files");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch files");
      setFiles(result.files);
    } catch (error) {
      console.error("Fetch Files Error:", error);
      alert("❌ โหลดรายการไฟล์ล้มเหลว!");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ✅ ฟังก์ชัน refreshSidebar ที่ส่งไปให้ EditPanel
  const refreshSidebar = () => {
    fetchFiles(); // รีเฟรชไฟล์ใหม่จาก Server
  };

  useEffect(() => {
      setIsSidebarOpen(true);
    }, [setIsSidebarOpen]);

  const addTable = () => {
    console.log("📌 Creating chart with", { selectedFile, selectedColumns });

    const newItem = { 
      id: Date.now(), 
      type: "chartbox", 
      posX: 100, 
      posY: 100, 
      viewMode,
      zIndex: pages[currentPage]?.length + 1 || 1 
     };
    // setPages((prev) => {
    //   const updated = [...prev];
    //   updated[currentPage] = [...updated[currentPage], newItem];
    //   return updated;
    // });
    addItem(newItem);
  };

  const addTextBox = () => {
    const newItem = { 
      id: Date.now(), 
      type: "text", 
      text: "", 
      x: 100, 
      y: 100 
    };
    // setPages((prev) => {
    //   const updated = [...prev];
    //   updated[currentPage] = [...updated[currentPage], newItem];
    //   return updated;
    // });
    addItem(newItem);
  };

  const handleTextChange = (id, newText) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map(el => el.id === id ? { ...el, text: newText } : el);
      return updated;
    });
  };

  const handleDelete = (id) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].filter(el => el.id !== id);
      return updated;
    });
  };


  const toggleFileVisibility = async (file) => {
    setVisibleColumns((prev) => ({ ...prev, [file]: !prev[file] }));

    if (!data[file]) {
      try {
        const res = await fetch(`/api/get-data?file=${file}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch data");
        setData((prev) => ({ ...prev, [file]: result }));
      } catch (error) {
        console.error("Fetch Data Error:", error);
        alert("❌ โหลดข้อมูลล้มเหลว!");
      } 
      
    }

   
  };

  const toggleColumn = (file, col) => {
    setSelectedColumns((prev) => {
      const newCols = { ...prev };
      newCols[file] = newCols[file]?.includes(col)
        ? newCols[file].filter((c) => c !== col)
        : [...(newCols[file] || []), col];
      return newCols;
    });
  };

  const setViewMode = (newMode) => {
    if (selectedItemIds.length === 0) return;
  
    setPages((prev) => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map(item =>
        selectedItemIds.includes(item.id) 
          ? { ...item, viewMode: newMode } 
          : item
      );
      return updated;
    });
  };

  const onChangeAxis = (chartId, axisType, columnName) => {
    const file = selectedFile;
    if (!file) return;
  
    setSelectedColumns((prev) => {
      const current = prev[file] || [];
      let updated;
  
      if (axisType === "x") {
        updated = [columnName, current[1] || ""];
      } else {
        updated = [current[0] || "", columnName];
      }
  
      return { ...prev, [file]: updated };
    });
  };
  
  const bringForward = () => {
    const updatedItems = [...pages[currentPage]];
  
    selectedItemIds.forEach(id => {
      const index = updatedItems.findIndex(item => item.id === id);
      if (index !== -1 && index < updatedItems.length - 1) {
        [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
      }
    });
  
    const updatedPages = [...pages];
    updatedPages[currentPage] = updatedItems;
    setPages(updatedPages);
  };
  
  

  const bringToFront = () => {
    const items = [...pages[currentPage]];
    const remaining = items.filter(i => !selectedItemIds.includes(i.id));
    const selected = items.filter(i => selectedItemIds.includes(i.id));
    
    const updatedPages = [...pages];
    updatedPages[currentPage] = [...remaining, ...selected];
    setPages(updatedPages);
  };


  const sendBackward = () => {
    const updatedItems = [...pages[currentPage]];
  
    selectedItemIds.forEach(id => {
      const index = updatedItems.findIndex(item => item.id === id);
      if (index > 0) {
        [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
      }
    });
  
    const updatedPages = [...pages];
    updatedPages[currentPage] = updatedItems;
    setPages(updatedPages);
  };
  
  const sendToBack = () => {
    const items = [...pages[currentPage]];
    const remaining = items.filter(i => !selectedItemIds.includes(i.id));
    const selected = items.filter(i => selectedItemIds.includes(i.id));
    
    const updatedPages = [...pages];
    updatedPages[currentPage] = [...selected, ...remaining];
    setPages(updatedPages);
  };

  const alignItems = (type) => {
    const updatedItems = [...pages[currentPage]];
    const selected = updatedItems.filter(i => selectedItemIds.includes(i.id));
    if (selected.length === 0) return;
  
    const base = selected[0];
    const baseX = base.posX ?? base.x ?? 0;
    const baseY = base.posY ?? base.y ?? 0;
  
    const aligned = updatedItems.map(i => {
      if (!selectedItemIds.includes(i.id)) return i;
  
      switch (type) {
        case "left":
          return { ...i, posX: baseX };
        case "right":
          return { ...i, posX: baseX + 100 };
        case "top":
          return { ...i, posY: baseY };
        case "bottom":
          return { ...i, posY: baseY + 100 };
        case "horizontal": {
          const avgX = selected.reduce((sum, item) => sum + (item.posX ?? item.x ?? 0), 0) / selected.length;
          return { ...i, posX: avgX };
        }
        case "vertical": {
          const avgY = selected.reduce((sum, item) => sum + (item.posY ?? item.y ?? 0), 0) / selected.length;
          return { ...i, posY: avgY };
        }
        default:
          return i;
      }
    });  
    
    const updatedPages = [...pages];
    updatedPages[currentPage] = aligned;
    setPages(updatedPages);
  };
   
  

    const handleGroup = () => {
      if (selectedItemIds.length < 2) return;
      const groupId = Date.now(); // ให้ groupId แบบ unique
    
      setPages(prev => {
        const updated = [...prev];
        updated[currentPage] = updated[currentPage].map(item =>
          selectedItemIds.includes(item.id)
            ? { ...item, groupId }
            : item
        );
        return updated;
      });
    };
  
  const handleUngroup = () => {
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].map(item =>
        selectedItemIds.includes(item.id)
          ? { ...item, groupId: null }
          : item
      );
      return updated;
    });
  };




const addShape = (type) => {
  const newItem = {
    id: Date.now(),
    type,     // "square", "circle", etc.
    posX: 100,
    posY: 100,
    width: 100,
    height: 100,
    strokeColor: "#000000",
    strokeWidth: 2,
    rotation: 0, // << สำคัญ!
  strokeStyle: "solid"
  };

  setPages((prev) => {
    const updated = [...prev];
    updated[currentPage] = [...updated[currentPage], newItem];
    return updated;
  });
};

const handleCopy = () => {
  const firstId = selectedItemIds[0];
  const item = pageItems.find((i) => i.id === firstId);
  if (item) {
    setClipboard({ ...item });
  }
};

const handleCut = () => {
  const firstId = selectedItemIds[0];
  const item = pageItems.find((i) => i.id === firstId);
  if (item) {
    setClipboard({ ...item });
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].filter(i => i.id !== firstId);
      return updated;
    });
    setSelectedItemIds([]);
  }
};

const handlePaste = () => {
  if (clipboard) {
    const newItem = {
      ...clipboard,
      id: Date.now(),
      posX: (clipboard.posX || clipboard.x || 50) + 20,
      posY: (clipboard.posY || clipboard.y || 50) + 20,
    };
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = [...updated[currentPage], newItem];
      return updated;
    });
    setSelectedItemIds([newItem.id]);
  }
};


const handleDeleteItem = () => {
  if (selectedItemIds.length > 0) {
    setPages(prev => {
      const updated = [...prev];
      updated[currentPage] = updated[currentPage].filter(i => !selectedItemIds.includes(i.id));
      return updated;
    });
    setSelectedItemIds([]);
  }
};

const handleSelectAll = () => {
  const allIds = pageItems.map(item => item.id);
  setSelectedItemIds(allIds);
};

return (
    <div className="ml-[5.5rem]">
      
      <Toolbar
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        pages={pages}
        setPages={setPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        canvasRef={canvasRef}  // ✅ ถูกต้องแล้ว
        report={setReport}
        reportName={reportName}
        setReportName={setReportName}
        selectedChartId={selectedChartId}
      />

      {activePanel === "edit" && 
      <EditPanel 
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        onDelete={handleDeleteItem}
        onSelectAll={handleSelectAll}
        refreshSidebar={refreshSidebar}
        onUndo={handleUndo}
        onRedo={handleRedo} 
    />}
      {activePanel === "insert" && 
        <InsertPanel 
          addTable={addTable} 
          addTextBox={addTextBox} 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          selectedFile={selectedFile}
          data={data}
          selectedColumns={selectedColumns}
          selectedChartId={selectedItemIds[0]}  
          onChangeAxis={onChangeAxis} 
          onAddShape={addShape} 
        />}
      {activePanel === "arrange" && 
        <ArrangePanel 
          onBringForward={bringForward}
          onBringToFront={bringToFront}
          onSendBackward={sendBackward}
          onSendToBack={sendToBack}
          onGroup={handleGroup}
          onUngroup={handleUngroup}
          onMerge={() => {}}
          onAlign={alignItems}
        />}
      {activePanel === "view" && <ViewPanel {...{ zoomLevel, setZoomLevel, showGrid, setShowGrid, isLocked, setIsLocked }} />}

      <SidebarData {...{ files, selectedFile, setSelectedFile, data, selectedColumns, visibleColumns, toggleFileVisibility, toggleColumn, isSidebarOpen, setIsSidebarOpen }} />

      
      <CanvasArea
        pages={pages}
        pageItems={pageItems}
        setPages={setPages}
        currentPage={currentPage} 
        zoomLevel={zoomLevel}
        showGrid={showGrid}
        isLocked={isLocked}
        handleTextChange={handleTextChange}
        handleDelete={handleDelete}
        selectedFile={selectedFile}               // ✅ เพิ่ม
        selectedColumns={selectedColumns}         // ✅ เพิ่ม
        data={data}                               // ✅ เพิ่ม (สำหรับกราฟ)
        viewMode={viewMode}
        ref={canvasRef}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
        onBringForward={bringForward}
        onSendBackward={sendBackward}
        onGroup={handleGroup}
        onUngroup={handleUngroup}
        onAlign={alignItems} 
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        onDelete={handleDelete}
        onSelectAll={handleSelectAll} 
        saveState={saveState}
        setSelectedChartId={setSelectedChartId}         
      />
      
    </div>
   
  );
};

export default App;

