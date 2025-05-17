'use client';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useMainData } from '../MainDataContext/page'; // <-- Import Context
import 'webdatarocks/webdatarocks.css'; // default CSS

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
  },
};

const PivotTableComponent = () => {
  const pivotRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { mainData } = useMainData(); // <-- Get mainData from Context

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    if (pivotRef.current) {
      pivotRef.current.dispose();  // Destroy instance
      pivotRef.current = null;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && mainData) {
      const themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.href = 'https://cdn.webdatarocks.com/latest/theme/blue/webdatarocks.min.css';
      document.head.appendChild(themeLink);

      const script = document.createElement('script');
      script.src = 'https://cdn.webdatarocks.com/latest/webdatarocks.js';
      script.onload = () => {
        const pivot = new window.WebDataRocks({
          container: "#pivot-container",
          toolbar: true,
          height: '100%',
          theme: "blue",
          report: {
            dataSource: {
              data: mainData.rows
            },
            options: {
              grid: {
                type: "flat", // <-- ปรับเป็น flat เพื่อแสดงข้อมูลดิบ
                showGrandTotals: "off" // <-- ปิดการแสดง Grand Total
              }
            },
            slice: {
              rows: mainData.columns.map((col) => ({ uniqueName: col }))
            }
          }
        });
        pivotRef.current = pivot;
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, mainData]);

  return (
    <>
      <button 
        onClick={handleOpenModal} 
        className="px-1 py-1 rounded hover:bg-gray-200 flex items-center"
      >
        <img src="/PivotColumn.png" alt="PivotColumn" width={20} height={20} />
        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Pivot Column</span>
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Pivot Table Modal"
      >
        {/*<button
                        className=" px-1 py-1 rounded hover:bg-gray-200 flex items-center" 
                    >
                        <img src="/PivotColumn.png" alt="PivotColumn" width={20} height={20} />
                        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Pivot Column</span>
                    </button>
        <div className="modal-header cursor-move text-2xl font-semibold mb-5 relative">
          Append
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 text-black text-gray-600 hover:text-red-500 text-2xl"
            >
              ✕
            </button>
            <div id="pivot-container" />
          </div>*/}
        <div className="modal-header cursor-move text-2xl font-semibold mb-5 relative ">
          Pivot Table
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 text-gray-600 text-2xl"
            >
              ✕
            </button>
            <div id="pivot-container" style={{ height: '100%', marginTop: '2rem' }}/>
          </div>
      </Modal>
    </>
  );
};

export default PivotTableComponent;
