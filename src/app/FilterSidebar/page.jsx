import React, { useState } from 'react';

const FilterSidebar = ({ onClose, onApply }) => {
    const [column, setColumn] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState('');

    const operators = ['Equals', 'Greater Than', 'Less Than', 'Contains'];

    const handleApply = () => {
        onApply({ column, operator, value });
        onClose();
    };

    return (
        <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 p-4">
            <h2 className="text-xl mb-4">Filter Options</h2>
            
            <div className="mb-4">
                <label className="block mb-2">Column:</label>
                <input 
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Operator:</label>
                <select 
                    className="border px-2 py-1 w-full"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                >
                    {operators.map((op, index) => (
                        <option key={index} value={op}>{op}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Value:</label>
                <input 
                    type="text"
                    className="border px-2 py-1 w-full"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button className="bg-gray-200 px-4 py-2" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};

export default FilterSidebar;
