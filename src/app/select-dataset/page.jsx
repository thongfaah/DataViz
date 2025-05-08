"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChevronLeft } from "lucide-react";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ลงทะเบียน module ที่จำเป็นสำหรับ Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SelectDataset() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [chartData, setChartData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  // ดึงรายการชุดข้อมูลจาก API
  useEffect(() => {
    const fetchDatasets = async () => {
      const res = await fetch("/api/datasets");
      const result = await res.json();
      if (res.ok) {
        setDatasets(result.datasets);
      }
    };
    fetchDatasets();
  }, []);

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
  
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">เลือกชุดข้อมูล</h2>
      <select
        className="border p-2 mb-4"
        value={selectedDataset}
        onChange={handleDatasetChange}
      >
        <option value="">-- เลือกชุดข้อมูล --</option>
        {datasets.map((dataset) => (
          <option key={dataset._id} value={dataset._id}>
            {dataset.name}
          </option>
        ))}
      </select>

      {chartData && (
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: { type: "category" }, // แกน x เป็นประเภทหมวดหมู่
                y: { beginAtZero: true }, // แกน y เริ่มจาก 0
              },
            }}
          />
        </div>
      )}

        {!isSidebarOpen && (
          <button
            className="fixed right-0  p-2 bg-gray-200 hover:bg-gray-300 rounded-l"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronLeft className="w-4 h-4"/>
          </button>
        )}

    </div>
  );
}