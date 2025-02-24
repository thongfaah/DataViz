"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ลงทะเบียน module ที่จำเป็นสำหรับ Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SelectDataset() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [chartData, setChartData] = useState(null);

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

  // โหลดข้อมูลที่เลือกและแปลงเป็นรูปแบบที่ใช้กับ Chart.js
  const handleDatasetChange = async (e) => {
    const datasetId = e.target.value;
    setSelectedDataset(datasetId);

    if (datasetId) {
      const res = await fetch(`/api/datasets/${datasetId}`);
      const result = await res.json();
      console.log("API Response:", result); // ✅ ตรวจสอบข้อมูล

      if (res.ok && result.data.length > 0) {
        const firstItem = result.data[0]; // ดึง Object แรกของข้อมูล
        const keys = Object.keys(firstItem); // หาชื่อคีย์ทั้งหมด

        if (keys.length < 2) {
          console.error("Data format is incorrect.");
          return;
        }

        const xKey = keys[0]; // ใช้คีย์แรกเป็นแกน X
        const yKey = keys[1]; // ใช้คีย์ที่สองเป็นแกน Y

        setChartData({
          labels: result.data.map((item) => item[xKey]), // ✅ สร้าง labels อัตโนมัติ
          datasets: [
            {
              label: `ค่าของ ${yKey}`,
              data: result.data.map((item) => parseFloat(item[yKey]) || 0), // ✅ ใช้ yKey อัตโนมัติ
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
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
    </div>
  );
}