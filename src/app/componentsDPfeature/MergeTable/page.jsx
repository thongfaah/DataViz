'use client';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const MergeTable = ({ tableA, tableB, onMergeComplete }) => {
    const [primaryKeyA, setPrimaryKeyA] = useState('');
    const [primaryKeyB, setPrimaryKeyB] = useState('');
    const [joinType, setJoinType] = useState('inner');
    const [mergedData, setMergedData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // ฟังก์ชัน Merge
    const handleMerge = () => {
        if (!primaryKeyA || !primaryKeyB) {
            setErrorMessage('กรุณาเลือก Primary Key ให้ครบทั้งสองตาราง');
            return;
        }
        setErrorMessage('');

        let merged;
        if (joinType === 'inner') {
            merged = tableA.filter(a =>
                tableB.some(b => a[primaryKeyA] === b[primaryKeyB])
            ).map(a => ({
                ...a,
                ...tableB.find(b => b[primaryKeyB] === a[primaryKeyA])
            }));
        } else if (joinType === 'left') {
            merged = tableA.map(a => ({
                ...a,
                ...tableB.find(b => b[primaryKeyB] === a[primaryKeyA]) || {}
            }));
        } else if (joinType === 'right') {
            merged = tableB.map(b => ({
                ...b,
                ...tableA.find(a => a[primaryKeyA] === b[primaryKeyB]) || {}
            }));
        } else if (joinType === 'full') {
            const left = tableA.map(a => ({
                ...a,
                ...tableB.find(b => b[primaryKeyB] === a[primaryKeyA]) || {}
            }));
            const right = tableB.filter(b =>
                !tableA.some(a => a[primaryKeyA] === b[primaryKeyB])
            ).map(b => ({ ...b }));
            merged = [...left, ...right];
        }

        if (merged.length > 0) {
            setMergedData(merged);

            // 🔄 ส่งผลลัพธ์ไปที่ TestMergeUI เพื่อ Update Context
            const mergedColumns = Object.keys(merged[0]);
            onMergeComplete(merged, mergedColumns);
        } else {
            setErrorMessage('ไม่พบข้อมูลที่สามารถ Merge ได้');
        }
    };

    return (
        <div className="p-4 space-y-1  text-gray-600">
            <div className="space-y-2">
                <label>Select Primary Key for Left Table</label>
                <select
                    value={primaryKeyA}
                    onChange={(e) => setPrimaryKeyA(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="" disabled></option>
                    {Object.keys(tableA[0] || {}).map((key, index) => (
                        <option key={index} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2  text-gray-600">
                <label>Select Primary Key for Right Table</label>
                <select
                    value={primaryKeyB}
                    onChange={(e) => setPrimaryKeyB(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="" disabled></option>
                    {Object.keys(tableB[0] || {}).map((key, index) => (
                        <option key={index} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label>Join Kind</label>
                <select
                    value={joinType}
                    onChange={(e) => setJoinType(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="inner">Inner Join</option>
                    <option value="left">Left Join</option>
                    <option value="right">Right Join</option>
                    <option value="full">Full Outer Join</option>
                </select>
            </div>
            <div className="space-x-2 flex justify-end ">
              <button
                onClick={handleMerge}
                className="bg-[#2B3A67] text-white px-7 py-1 rounded"
              >
                OK
              </button>
              <button
                
                className=" text-black border border-gray-500 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>

            {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            {mergedData.length > 0 && (
                <div className="mt-4">
                    <DataTable
                        columns={Object.keys(mergedData[0] || {}).map(key => ({
                            name: key,
                            selector: row => row[key],
                            sortable: true
                        }))}
                        data={mergedData}
                    />
                </div>
            )}
        </div>
    );
};

export default MergeTable;
