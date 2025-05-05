"use client";
import React, { useState } from "react";
import Papa from 'papaparse';
import * as aq from 'arquero';

export default function DataMergeApp() {
  const [datasets, setDatasets] = useState({});
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [joinKeys, setJoinKeys] = useState({ data1: "", data2: "" });
  const [mergedResult, setMergedResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setError("");
    try {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true });
      const idKey = key === "data1" ? "id_1" : "id_2";
      // แปลงค่า id เป็น string หรือ number ทั้งหมด
      const normalizedData = parsed.data
  .map((row) => {
    const cleaned = Object.fromEntries(
      Object.entries(row).map(([k, v]) => [k.trim(), v?.toString().trim()])
    );
    return {
      ...cleaned,
      id: cleaned["id"]?.toString().trim(),
    };
  })
  .filter((row) => row.id);  // 🧹 ลบแถวที่ id เป็น undefined หรือว่าง

      const tbl = aq.from(normalizedData);
      setDatasets((prev) => ({ ...prev, [key]: tbl }));
    } catch (err) {
      console.error("File upload error:", err);
      setError(`❌ Failed to read file: ${file.name}`);
    }
  };

  const handleColumnClick = (datasetKey) => {
    setError("");
    if (!selectedDatasets.includes(datasetKey)) {
      setSelectedDatasets((prev) => [...prev, datasetKey]);
    } else {
      setSelectedDatasets((prev) => prev.filter((d) => d !== datasetKey));
    }
  };

  const handleMerge = () => {
    setError("");
    setMergedResult(null);
  
    if (selectedDatasets.length !== 2) {
      setError("⚠️ Select exactly 2 datasets to merge.");
      return;
    }
  
    const [d1, d2] = selectedDatasets;
    const tbl1 = datasets[d1];
    const tbl2 = datasets[d2];
    const key1 = joinKeys[d1];
    const key2 = joinKeys[d2];
  
    if (!tbl1 || !tbl2) {
      setError("❌ One or both datasets are missing.");
      return;
    }
  
    if (!key1 || !key2) {
      setError("⚠️ Please select join columns for both datasets.");
      return;
    }
  
    if (!tbl1.columnNames().includes(key1)) {
      setError(`❌ Column "${key1}" not found in dataset #1`);
      return;
    }
  
    if (!tbl2.columnNames().includes(key2)) {
      setError(`❌ Column "${key2}" not found in dataset #2`);
      return;
    }
  
    try {
       console.log("📦 tbl1 columns:", tbl1.columnNames());
  console.log("📦 tbl2 columns:", tbl2.columnNames());

  console.log("📈 tbl1 preview:", tbl1.objects().slice(0, 3));
  console.log("📈 tbl2 preview:", tbl2.objects().slice(0, 3));
      // ✅ Rename keys to prevent collision
      const tbl1Renamed = tbl1.rename({ [key1]: "joinKey" });
      const tbl2Renamed = tbl2.rename({ [key2]: "joinKey" });
  
      // ✅ Join with suffix for column disambiguation
      const joinedRaw = tbl1Renamed
        .join(tbl2Renamed, ["joinKey"], ["joinKey"], { suffix: ["_left", "_right"] })
        .derive({ id: (d) => d.joinKey });
  
      // ✅ Select columns explicitly after join
      const columns = joinedRaw.columnNames().filter((c) => c !== "joinKey");
      const joined = joinedRaw.select(...columns);
  
      console.log("✅ Merged columns:", joined.columnNames());
      setMergedResult(joined);
    } catch (err) {
      console.error("Merge Error:", err);
      setError("❌ Failed to merge datasets. Check data consistency.");
    }
  };
  
  
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">📊 CSV Data Merge Tool</h1>

      <div className="space-x-4">
        <label className="block">
          Upload CSV #1:
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileUpload(e, "data1")}
            className="mt-1"
          />
        </label>
        <label className="block">
          Upload CSV #2:
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileUpload(e, "data2")}
            className="mt-1"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(datasets).map(([key, data]) => (
          <div key={key} className="border rounded shadow">
            <h2
              className={`text-lg p-2 font-semibold cursor-pointer ${
                selectedDatasets.includes(key) ? "bg-blue-200" : "bg-gray-100"
              }`}
              onClick={() => handleColumnClick(key)}
            >
              {key}
            </h2>

            {/* 🔽 Select join column */}
            <div className="p-2">
              <label className="text-sm mr-2">Join on column:</label>
              <select
                className="border px-2 py-1 text-sm"
                value={joinKeys[key] || ""}
                onChange={(e) =>
                  setJoinKeys((prev) => ({ ...prev, [key]: e.target.value }))
                }
              >
                <option value="">-- Select column --</option>
                {data.columnNames().map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {/* 🔍 Table Preview */}
            <table className="table-auto w-full text-sm">
              <thead>
                <tr>
                  {data.columnNames().map((col) => (
                    <th key={col} className="border px-2 py-1 bg-gray-200">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.objects().slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {data.columnNames().map((col) => (
                      <td key={col} className="border px-2 py-1">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <button
        onClick={handleMerge}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Merge Selected
      </button>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {mergedResult && (
  <div className="border rounded p-4 mt-4 bg-gray-50">
    <h2 className="font-semibold mb-2">🧾 Merged Result</h2>
    <table className="table-auto w-full text-sm">
      <thead>
        <tr>
          {mergedResult.columnNames().map((col) => (
            <th key={col} className="border px-2 py-1 bg-gray-300">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mergedResult.objects().map((row, i) => (
          <tr key={i}>
            {mergedResult.columnNames().map((col) => (
              <td key={col} className="border px-2 py-1">
                {row[col] ?? ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}
