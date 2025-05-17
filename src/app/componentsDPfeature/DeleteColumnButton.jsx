'use client';
import { useMainData } from '../MainDataContext/page';

export default function DeleteColumnButton() {
  const { mainData, setMainData, selectedColumn, setSelectedColumn } = useMainData();

  const handleDeleteColumn = () => {
    if (!mainData || !selectedColumn) return;

    const newColumns = mainData.columns.filter(col => col !== selectedColumn);
    const newRows = mainData.rows.map(row => {
      const { [selectedColumn]: _, ...rest } = row;
      return rest;
    });

    setMainData({
      ...mainData,
      columns: newColumns,
      rows: newRows
    });

    setSelectedColumn(null); // clear selection
  };

  return (
    <button
      className="btn flex flex-col items-center"
      disabled={!selectedColumn}
      onClick={handleDeleteColumn}
    >
      <svg width="35" height="35" viewBox="0 0 79 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.3333 0H52.6667V48.0352L39.5 62.0674L26.3333 47.9912V0ZM79 0V45.044H57.9333V39.4135H73.7333V0H79ZM5.26667 39.4135H21.0667V45.044H0V0H5.26667V39.4135ZM52.5432 66.0704L43.2443 76.0117L52.5432 85.9971L48.8401 89.956L39.5 80.0147L30.1599 90L26.4568 85.9971L35.7969 76.0117L26.4568 66.0264L30.1599 62.0674L39.5 72.0528L48.8401 62.0674L52.5432 66.0704Z" fill="#2B3A67"/>
                    </svg>
                <span className="block  mt-1.25" style={{ fontSize: "0.75rem" }}>Remove</span>
                <span className="block" style={{ fontSize: "0.75rem" }}>Columns</span>
    </button>
    
    
  );
}
{/*<button
                className="btn flex flex-col items-center "
            >
                <svg width="35" height="35" viewBox="0 0 79 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.3333 0H52.6667V48.0352L39.5 62.0674L26.3333 47.9912V0ZM79 0V45.044H57.9333V39.4135H73.7333V0H79ZM5.26667 39.4135H21.0667V45.044H0V0H5.26667V39.4135ZM52.5432 66.0704L43.2443 76.0117L52.5432 85.9971L48.8401 89.956L39.5 80.0147L30.1599 90L26.4568 85.9971L35.7969 76.0117L26.4568 66.0264L30.1599 62.0674L39.5 72.0528L48.8401 62.0674L52.5432 66.0704Z" fill="#2B3A67"/>
                    </svg>
                <span className="block  mt-1.25" style={{ fontSize: "0.75rem" }}>Remove</span>
                <span className="block" style={{ fontSize: "0.75rem" }}>Columns</span>
                </button>*/}