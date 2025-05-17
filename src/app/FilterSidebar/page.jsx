"use client"

import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle } from 'lucide-react';

const FilterSidebar = ({ onClose, onApply, columns }) => {
    const [conditions, setConditions] = useState([
        { column: '', operator: 'Equals', value: '' }
    ]);

    const operators = ['Equals', 'Greater Than', 'Less Than', 'Contains'];

    const addCondition = () => {
        setConditions([...conditions, { column: '', operator: 'Equals', value: '' }]);
    };

    const removeCondition = (index) => {
        const updatedConditions = [...conditions];
        updatedConditions.splice(index, 1);
        setConditions(updatedConditions);
    };

    const updateCondition = (index, field, value) => {
        const updatedConditions = [...conditions];
        updatedConditions[index][field] = value;
        setConditions(updatedConditions);
    };

    const handleApply = () => {
        onApply(conditions);
        onClose();
    };

    return (
        <div className="fixed right-0 top-[10rem] h-[32.3rem] w-[15rem] bg-white z-50 p-4 overflow-auto border-l border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Filter Options</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                    <XCircle size={24} />
                </button>
            </div>

            {conditions.map((condition, index) => (
                <div key={index} className="mb-4 p-3 rounded-lg shadow-sm bg-gray-100 border-l-4 border-blue-500 relative">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Column:</label>
                        <select
                            className="border border-gray-300 px-2 py-1 w-full rounded"
                            value={condition.column}
                            onChange={(e) => updateCondition(index, 'column', e.target.value)}
                        >
                            <option value="" disabled>Select Column</option>
                            {columns.map((col, idx) => (
                                <option key={idx} value={col}>
                                    {col}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Operator:</label>
                        <select
                            className="border border-gray-300 px-2 py-1 w-full rounded"
                            value={condition.operator}
                            onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                        >
                            {operators.map((op, idx) => (
                                <option key={idx} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Value:</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-2 py-1 w-full rounded"
                            value={condition.value}
                            onChange={(e) => updateCondition(index, 'value', e.target.value)}
                        />
                    </div>

                    {conditions.length > 1 && (
                        <button
                            className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                            onClick={() => removeCondition(index)}
                        >
                            <XCircle size={20} />
                        </button>
                    )}
                </div>
            ))}

            <button
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 w-full flex items-center justify-center space-x-2"
                onClick={addCondition}
            >
                <PlusCircle size={18} />
                <span>Add Condition</span>
            </button>

            <div className="flex justify-between space-x-4 mt-6">
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 w-full" onClick={onClose}>
                    Cancel
                </button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" onClick={handleApply}>
                    Apply
                </button>
                
            </div>
        </div>
    );
};

export default FilterSidebar;
