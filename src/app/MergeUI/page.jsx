"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import MergeTable from "../componentsDPfeature/MergeTable/page";
import { useMainData } from "../MainDataContext/page";
import { Rnd } from "react-rnd";

const MergeUI = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileB, setSelectedFileB] = useState("");
  const [tableB, setTableB] = useState([]);
  const { mainData, setMainData } = useMainData();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("/api/files");
        const result = await response.json();
        if (result.success) {
          setFiles(result.data);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const handleSelectFileB = (fileId) => {
    const selectedFile = files.find((file) => file._id === fileId);
    if (!selectedFile) return;

    setSelectedFileB(fileId);
    setTableB(selectedFile.rows);
  };

  const handleMergeComplete = (mergedData, mergedColumns) => {
    const newMainData = {
      table_name: `Merged_${mainData.table_name}_${selectedFileB}`,
      columns: mergedColumns,
      rows: mergedData,
      columnTypes: {},
    };

    setMainData(newMainData);
    onClose();
  };

  const generateColumns = (data) => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Merge Table Modal"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="bg-white w-[90%] h-[90%] rounded-lg p-4 overflow-auto"
    >
      <div className="modal-header cursor-move text-2xl font-semibold mb-5 relative">
        Merge
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-600 hover:text-red-500 text-2xl"
        >
          ✕
        </button>
      </div>
      <h3 className="text-lg mb-4  text-gray-600">
        Select a table and matching columns to createa merged table
      </h3>
      <h2 className="text-xl mb-4 text-gray-700">
        {mainData ? mainData.table_name : "Loading..."}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* ตาราง A */}
        <div className="border border-gray-300 rounded-lg p-2">
          {mainData?.rows && mainData.rows.length > 0 ? (
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <DataTable
                columns={generateColumns(mainData.rows)}
                data={mainData.rows}
                pagination
                highlightOnHover
                striped
              />
            </div>
          ) : (
            <p className="text-red-500">ยังไม่มีข้อมูลจาก MainData หรือกำลังโหลด...</p>
          )}
        </div>

        {/* ตาราง B */}
        <div className="border border-gray-300 rounded-lg p-2">
          <select
            onChange={(e) => handleSelectFileB(e.target.value)}
            className="block p-2 border rounded w-full mb-2"
            value={selectedFileB}
          >
            <option value="" disabled>
              Select a Table
            </option>
            {files.map((file) => (
              <option key={file._id} value={file._id}>
                {file.table_name}
              </option>
            ))}
          </select>

          {tableB.length > 0 ? (
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <DataTable
                columns={generateColumns(tableB)}
                data={tableB}
                pagination
                highlightOnHover
                striped
              />
            </div>
          ) : (
            <p className="text-gray-700">No preview is available</p>
          )}
        </div>
      </div>

      {/* Merge Button */}
      {mainData?.rows && mainData.rows.length > 0 && tableB.length > 0 ? (
        <MergeTable
          tableA={mainData.rows}
          tableB={tableB}
          onMergeComplete={handleMergeComplete}
          
        />
      ) : (
        <p className="text-gray-600 mt-4">
          Select the table first.
        </p>
      )}
    </Modal>
  );
};

export default MergeUI;
