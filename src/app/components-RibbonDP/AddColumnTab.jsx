import React, { useState, useRef, useEffect } from "react";
import { useMainData } from "../MainDataContext/page";
import ColumnFormatMenu from "../componentsDPfeature/ColumnFormatMenu";
import AddColumnModal from "../componentsDPfeature/AddColumnModal";
import AddBlankColumn from "../componentsDPfeature/AddBlankColumn";
import dynamic from 'next/dynamic';



const AddColumnTab = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const HeadersRef = useRef(null);
  const FormatRef = useRef(null);
  const { mainData, setMainData } = useMainData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [showPivot, setShowPivot] = useState(false);
  const PivotTable = dynamic(() => import("../componentsDPfeature/PivotTable"), { ssr: false });
  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };
  const handleTogglePivot = () => {
    setShowPivot(!showPivot);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        HeadersRef.current && !HeadersRef.current.contains(event.target) &&
        FormatRef.current && !FormatRef.current.contains(event.target) 
      ) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleAddColumn = (columnName, columnData) => {
    if (!mainData) return;

    // สร้าง Column ใหม่
    const updatedColumns = [...mainData.columns, columnName];

    // เพิ่มข้อมูลใหม่ให้ทุกแถว
    const updatedRows = mainData.rows.map((row, index) => ({
      ...row,
      [columnName]: columnData[index] ?? null
    }));

    // อัปเดต Context
    setMainData({
      ...mainData,
      columns: updatedColumns,
      rows: updatedRows
    });
  };
  return (
    <div className="flex gap-4">
      
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 ">
            <div >
                <button 
                    onClick={() => setIsModalOpen2(true)} 
                    className="btn flex flex-col items-center"
                >
                    <svg width="35" height="35" viewBox="0 0 214 174" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H214V173.875H0V0ZM80.25 66.875V107H133.75V66.875H80.25ZM66.875 107V66.875H13.375V107H66.875ZM133.75 53.5V13.375H80.25V53.5H133.75ZM133.75 120.375H80.25V160.5H133.75V120.375ZM66.875 13.375H13.375V53.5H66.875V13.375ZM13.375 120.375V160.5H66.875V120.375H13.375Z" fill="#2B3A67"/>
                            </svg>
                            <span className="block  mt-0.5" style={{ fontSize: "0.75rem" }}>Add</span>
                            <span className="block" style={{ fontSize: "0.75rem" }}>Column</span>
                </button>
                {/* Modal สำหรับการกรอกข้อมูล */}
                {isModalOpen2 && (
                    <AddBlankColumn 
                    isOpen={isModalOpen2} 
                    onClose={() => setIsModalOpen2(false)} 
                    onConfirm={handleAddColumn} 
                    />
                )}
            </div>
            <div className="relative inline-block" ref={HeadersRef}>
                <button
                    className="btn flex flex-col items-center "
                    onClick={() => setModalOpen(true)}
                >
                    <svg width="35" height="35" viewBox="0 0 214 207" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 33H214V206.875H0V33ZM80.25 99.875V140H133.75V99.875H80.25ZM66.875 140V99.875H13.375V140H66.875ZM133.75 86.5V46.375H80.25V86.5H133.75ZM133.75 153.375H80.25V193.5H133.75V153.375ZM66.875 46.375H13.375V86.5H66.875V46.375ZM13.375 153.375V193.5H66.875V153.375H13.375Z" fill="#2B3A67"/>
                    <circle cx="168.5" cy="45.5" r="45.5" fill="white"/>
                    <path d="M170.96 88.4035L170.919 88.4111L170.649 88.5438L170.574 88.559L170.52 88.5438L170.251 88.4111C170.211 88.3985 170.18 88.4048 170.16 88.4301L170.145 88.468L170.081 90.0908L170.1 90.1667L170.138 90.216L170.532 90.4965L170.589 90.5117L170.634 90.4965L171.029 90.216L171.074 90.1553L171.089 90.0908L171.025 88.4718C171.015 88.4313 170.993 88.4086 170.96 88.4035ZM171.965 87.9751L171.916 87.9827L171.214 88.3353L171.176 88.3732L171.165 88.4149L171.233 90.0453L171.252 90.0908L171.283 90.1174L172.045 90.47C172.093 90.4826 172.129 90.4725 172.155 90.4397L172.17 90.3866L172.041 88.0585C172.028 88.013 172.003 87.9852 171.965 87.9751ZM169.254 87.9827C169.237 87.9725 169.217 87.9692 169.198 87.9735C169.179 87.9777 169.163 87.9892 169.152 88.0054L169.129 88.0585L169 90.3866C169.003 90.4321 169.024 90.4624 169.064 90.4776L169.121 90.47L169.883 90.1174L169.921 90.087L169.937 90.0453L170.001 88.4149L169.99 88.3694L169.952 88.3315L169.254 87.9827Z" fill="#FFAD14"/>
                    <path d="M168.713 72.2591C169.719 72.2591 170.683 72.6586 171.394 73.3697C172.105 74.0807 172.505 75.0452 172.505 76.0508V79.8424C172.505 80.8481 172.105 81.8125 171.394 82.5236C170.683 83.2346 169.719 83.6341 168.713 83.6341C167.708 83.6341 166.743 83.2346 166.032 82.5236C165.321 81.8125 164.922 80.8481 164.922 79.8424V76.0508C164.922 75.0452 165.321 74.0807 166.032 73.3697C166.743 72.6586 167.708 72.2591 168.713 72.2591ZM192.843 64.4862L195.524 67.1669C196.215 67.882 196.597 68.8398 196.588 69.834C196.58 70.8281 196.181 71.7791 195.478 72.4821C194.775 73.1851 193.824 73.5839 192.83 73.5925C191.836 73.6012 190.878 73.219 190.163 72.5283L187.482 69.8476C186.791 69.1325 186.409 68.1747 186.418 67.1805C186.426 66.1864 186.825 65.2354 187.528 64.5324C188.231 63.8294 189.182 63.4306 190.176 63.422C191.171 63.4133 192.128 63.7955 192.843 64.4862ZM144.583 64.4862C145.265 63.8062 146.181 63.4114 147.144 63.382C148.107 63.3526 149.045 63.6908 149.767 64.3279C150.49 64.965 150.943 65.8533 151.034 66.8123C151.126 67.7713 150.848 68.7291 150.259 69.4912L149.944 69.8476L147.264 72.5283C146.581 73.2083 145.666 73.6032 144.703 73.6326C143.74 73.662 142.802 73.3238 142.08 72.6866C141.357 72.0495 140.904 71.1612 140.813 70.2022C140.721 69.2432 140.998 68.2854 141.588 67.5233L141.902 67.1669L144.583 64.4862ZM168.713 22.9674C174.747 22.9674 180.533 25.3643 184.8 29.6308C189.066 33.8972 191.463 39.6838 191.463 45.7174C191.463 51.7511 189.066 57.5377 184.8 61.8041C180.533 66.0706 174.747 68.4674 168.713 68.4674C162.68 68.4674 156.893 66.0706 152.627 61.8041C148.36 57.5377 145.963 51.7511 145.963 45.7174C145.963 39.6838 148.36 33.8972 152.627 29.6308C156.893 25.3643 162.68 22.9674 168.713 22.9674ZM168.713 30.5508C164.691 30.5508 160.833 32.1487 157.989 34.993C155.144 37.8373 153.547 41.695 153.547 45.7174C153.547 49.7399 155.144 53.5976 157.989 56.4419C160.833 59.2862 164.691 60.8841 168.713 60.8841C172.736 60.8841 176.593 59.2862 179.438 56.4419C182.282 53.5976 183.88 49.7399 183.88 45.7174C183.88 41.695 182.282 37.8373 179.438 34.993C176.593 32.1487 172.736 30.5508 168.713 30.5508ZM138.38 41.9258C139.346 41.9269 140.276 42.2969 140.979 42.9603C141.681 43.6238 142.104 44.5305 142.161 45.4952C142.217 46.46 141.904 47.41 141.283 48.1511C140.663 48.8922 139.783 49.3684 138.824 49.4826L138.38 49.5091H134.588C133.622 49.508 132.692 49.138 131.99 48.4746C131.287 47.8111 130.864 46.9044 130.807 45.9397C130.751 44.9749 131.065 44.0249 131.685 43.2838C132.305 42.5427 133.185 42.0665 134.145 41.9523L134.588 41.9258H138.38ZM202.838 41.9258C203.844 41.9258 204.808 42.3253 205.519 43.0363C206.23 43.7474 206.63 44.7118 206.63 45.7174C206.63 46.7231 206.23 47.6875 205.519 48.3986C204.808 49.1096 203.844 49.5091 202.838 49.5091H199.047C198.041 49.5091 197.077 49.1096 196.365 48.3986C195.654 47.6875 195.255 46.7231 195.255 45.7174C195.255 44.7118 195.654 43.7474 196.365 43.0363C197.077 42.3253 198.041 41.9258 199.047 41.9258H202.838ZM141.902 18.9066C142.555 18.2537 143.424 17.8616 144.345 17.8036C145.267 17.7457 146.178 18.026 146.907 18.5919L147.264 18.9066L149.944 21.5873C150.625 22.2696 151.019 23.1852 151.049 24.1481C151.078 25.111 150.74 26.049 150.103 26.7715C149.466 27.4941 148.577 27.9471 147.618 28.0384C146.659 28.1298 145.702 27.8527 144.939 27.2634L144.583 26.9487L141.902 24.268C141.192 23.5569 140.792 22.5927 140.792 21.5873C140.792 20.5819 141.192 19.6176 141.902 18.9066ZM195.524 18.9066C196.235 19.6176 196.634 20.5819 196.634 21.5873C196.634 22.5927 196.235 23.5569 195.524 24.268L192.843 26.9487C192.494 27.3108 192.075 27.5997 191.613 27.7984C191.15 27.9971 190.653 28.1017 190.149 28.1061C189.646 28.1105 189.146 28.0145 188.68 27.8239C188.214 27.6332 187.791 27.3517 187.435 26.9957C187.079 26.6397 186.797 26.2163 186.607 25.7504C186.416 25.2844 186.32 24.7851 186.325 24.2816C186.329 23.7782 186.434 23.2806 186.632 22.818C186.831 22.3554 187.12 21.9371 187.482 21.5873L190.163 18.9066C190.874 18.1957 191.838 17.7964 192.843 17.7964C193.849 17.7964 194.813 18.1957 195.524 18.9066ZM168.713 7.80078C169.719 7.80078 170.683 8.20026 171.394 8.91133C172.105 9.62241 172.505 10.5868 172.505 11.5924V15.3841C172.505 16.3897 172.105 17.3542 171.394 18.0652C170.683 18.7763 169.719 19.1758 168.713 19.1758C167.708 19.1758 166.743 18.7763 166.032 18.0652C165.321 17.3542 164.922 16.3897 164.922 15.3841V11.5924C164.922 10.5868 165.321 9.62241 166.032 8.91133C166.743 8.20026 167.708 7.80078 168.713 7.80078Z" fill="#FFAD14"/>
                    </svg>
                    <span className="block mt-0.5" style={{ fontSize: "0.75rem" }}>Custom</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Column</span>
                </button>
                <AddColumnModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>
            <div className="flex items-center space-x-4 bg-gray-200 p-2">
      
    </div>
        </div>
        <p className="text-xs text-black">General</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={FormatRef}>
            <ColumnFormatMenu/>
            </div>
        </div>
        <p className="text-xs text-black mt-4">From Text</p>
    </div>
    
    </div>
  );
};

export default AddColumnTab;
