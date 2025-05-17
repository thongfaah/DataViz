import React, { useState, useRef, useEffect } from "react";
import { useMainData } from "../MainDataContext/page";
import ColumnFormatMenu from "../componentsDPfeature/ColumnFormatMenu";
import PivotTableComponent from "../PivotTableComponent/page";
const TransformTab = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const FillRef = useRef(null);
  const HeadersRef = useRef(null);
  const UnpivotColumnRef = useRef(null);
  const MoveRef = useRef(null);
  const FormatRef = useRef(null);
  const ReplaceValuesRef = useRef(null);
  const ExtractRef = useRef(null);
  const ParseRef = useRef(null);
  const StatisticsRef = useRef(null);
  const SplitColumnRef = useRef(null);
  const StandardRef = useRef(null);
  const { mainData } = useMainData();
  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        FillRef.current && !FillRef.current.contains(event.target) &&
        HeadersRef.current && !HeadersRef.current.contains(event.target) &&
        MoveRef.current && !MoveRef.current.contains(event.target) &&
        FormatRef.current && !FormatRef.current.contains(event.target) &&
        ReplaceValuesRef.current && !ReplaceValuesRef.current.contains(event.target) &&
        ExtractRef.current && !ExtractRef.current.contains(event.target) &&
        ParseRef.current && !ParseRef.current.contains(event.target) &&
        StatisticsRef.current && !StatisticsRef.current.contains(event.target) &&
        SplitColumnRef.current && !SplitColumnRef.current.contains(event.target) &&
        StandardRef.current && !StandardRef.current.contains(event.target) &&
        UnpivotColumnRef.current && !UnpivotColumnRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="flex gap-4">
      
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 ">
            <button
                className="btn flex flex-col items-center "
            >
                <img src="/GroupBy.png" alt="GroupBy" width={42} height={42} />
                <span className="block  mt-3" style={{ fontSize: "0.75rem" }}>Group</span>
                <span className="block" style={{ fontSize: "0.75rem" }}>By</span>
            </button>
            <div className="relative inline-block" ref={HeadersRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "Headers-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("Headers-file")}
                >
                    <svg width="36" height="31" viewBox="0 0 95 90" fill="none" xmlns="http://www.w3.org/2000/svg "className="block  ">
                    <g filter="url(#filter0_d_613_1016)">
                    <path d="M0 0.9375V90H95V0.9375H0ZM29.6875 84.0625H5.9375V72.1875H29.6875V84.0625ZM29.6875 66.25H5.9375V54.375H29.6875V66.25ZM29.6875 48.4375H5.9375V36.5625H29.6875V48.4375ZM29.6875 30.625H5.9375V18.75H29.6875V30.625ZM59.375 84.0625H35.625V72.1875H59.375V84.0625ZM59.375 66.25H35.625V54.375H59.375V66.25ZM59.375 48.4375H35.625V36.5625H59.375V48.4375ZM59.375 30.625H35.625V18.75H59.375V30.625ZM89.0625 84.0625H65.3125V72.1875H89.0625V84.0625ZM89.0625 66.25H65.3125V54.375H89.0625V66.25ZM89.0625 48.4375H65.3125V36.5625H89.0625V48.4375ZM89.0625 30.625H65.3125V18.75H89.0625V30.625Z" fill="#2B3A67"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_613_1016" x="-4" y="0.9375" width="103" height="97.0625" filterUnits="userSpaceOnUse" colorinterpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_613_1016"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_613_1016" result="shape"/>
                    </filter>
                    </defs>
                    </svg>
                    <span className="block  mt-0.5" style={{ fontSize: "0.75rem" }}>Use First Row</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>as Headers▾</span>
                </button>
                {isDropdownOpen === "Headers-file" && (
                    <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                    <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        
                    Use First Row as Headers
                    </li>
                    <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                        circle
                    </li>
                    </ul>
                )}
            </div>
            <div className="flex flex-col">
                <div  >
                    <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex  items-center"
                    >
                        <img src="/Transpose.png" alt="Transpose" width={22} height={22} />
                        <span className="ml-2.5" style={{ fontSize: "0.75rem" }}>Transpose</span>
                    </button>
                </div>
                <div  >
                    <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex  items-center"
                    >
                        <img src="/ReverseRows.png" alt="ReverseRows" width={18} height={18} />
                        <span className="ml-2.5" style={{ fontSize: "0.75rem" }}>Reverse Rows</span>
                    </button>
                </div>
                <div  >
                    <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex  items-center"
                    >
                        <img src="/CountRows.png" alt="CountRows" width={20} height={20} />
                        <span className="ml-2.5" style={{ fontSize: "0.75rem" }}>Count Rows</span>
                    </button>
                </div>
            </div>
        </div>
        <p className="text-xs text-black">Table</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="flex flex-col">
                <div >
                    <button
                        className="px-1 py-1 rounded hover:bg-gray-200 flex items-center"
                    >
                        <select className="px-0 py-0 rounded" style={{ fontSize: "0.75rem" }}>
                        <option>Data Type: Text</option>
                        <option>Data Type: Time</option>
                        </select>
                    
                    </button>
                </div>
                <div  >
                    <button
                        className=" px-1 py-2 rounded hover:bg-gray-200 flex items-center" 
                    >
                        <img src="/DetectDataType.png" alt="DetectDataType" width={18} height={18} />
                        <span className="ml-1" style={{ fontSize: "0.75rem" }}>Detect Data Type</span>
                    </button>
                </div>  
                <div  >
                    <button
                        className=" px-1 py-1 rounded hover:bg-gray-200 flex items-center" 
                    >
                        <img src="/Rename.png" alt="Rename" width={18} height={18} />
                        <span className="ml-1" style={{ fontSize: "0.75rem" }}>Rename</span>
                    </button>
                </div>  
            </div>
            <div className="flex flex-col">
                <div className="relative inline-block" ref={ReplaceValuesRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "ReplaceValues-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("ReplaceValues-file")}
                    >
                        <svg width="22" height="22" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.0021 35.9879L52.7642 57.827L74.1125 36.421L67.375 29.6835L57.6345 39.3759L57.5575 23.9759C57.5488 22.6733 58.0453 21.4181 58.9427 20.474C59.8402 19.5299 61.0687 18.9704 62.37 18.9131H77V9.625H62.37C60.492 9.62497 58.6325 9.99627 56.8986 10.7176C55.1646 11.4389 53.5904 12.4959 52.2665 13.8278C50.9426 15.1598 49.8951 16.7404 49.1844 18.4787C48.4736 20.217 48.1136 22.0787 48.125 23.9566V39.4625L37.7974 29.1926L31.0021 35.9879ZM95.2009 53.2551H95.2971C97.0553 56.2517 99.6412 57.75 103.055 57.75C106.841 57.75 109.857 56.1362 112.102 52.9086C114.374 49.681 115.506 45.4043 115.5 40.0785C115.5 35.1633 114.534 31.2909 112.603 28.4611C110.665 25.625 107.906 24.2069 104.325 24.2069C100.424 24.2069 97.4146 26.0709 95.2971 29.799H95.2009V9.625H86.625V56.9704H95.1913L95.2009 53.2551ZM95.0565 43.043V39.7705C95.0565 37.3835 95.618 35.4553 96.7409 33.9859C97.2229 33.2984 97.8643 32.7378 98.6102 32.3523C99.3561 31.9668 100.184 31.7677 101.024 31.7721C101.859 31.7404 102.688 31.9314 103.426 32.3254C104.163 32.7195 104.783 33.3025 105.221 34.0147C106.215 35.4906 106.712 37.5535 106.712 40.2036C106.712 43.3863 106.17 45.8503 105.086 47.5956C104.644 48.4029 103.987 49.0726 103.189 49.531C102.391 49.9895 101.482 50.219 100.562 50.1944C99.7879 50.199 99.0241 50.0168 98.3354 49.6632C97.6468 49.3097 97.0535 48.7952 96.6061 48.1635C95.5338 46.6773 94.9818 44.8741 95.0565 43.043ZM86.625 122.902C84.161 124.384 80.6062 125.125 75.9605 125.125C70.5384 125.125 66.1462 123.415 62.7839 119.995C59.428 116.575 57.75 112.167 57.75 106.77C57.75 100.533 59.5467 95.6244 63.14 92.0439C66.7462 88.4313 71.5587 86.625 77.5775 86.625C81.7483 86.625 84.7642 87.1993 86.625 88.3479V97.9536C84.4619 96.2236 81.7718 95.2861 79.002 95.2971C75.8707 95.2971 73.3874 96.2532 71.5523 98.1654C69.7299 100.052 68.822 102.67 68.8284 106.019C68.8284 109.266 69.701 111.823 71.4464 113.691C73.1981 115.532 75.6012 116.453 78.6555 116.453C81.3697 116.453 84.0262 115.567 86.625 113.796V122.902ZM38.5 67.375L28.875 77V134.75L38.5 144.375H105.875L115.5 134.75V77L105.875 67.375H38.5ZM38.5 77H105.875V134.75H38.5V77Z" fill="#2B3A67"/>
                        </svg>
                        <span className="ml-1" style={{ fontSize: "0.75rem" }}>Replace Values▾</span>
                    </button>
                    {isDropdownOpen === "ReplaceValues-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div>
                <div className="relative inline-block" ref={FillRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "Fill-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("Fill-file")}
                    >
                        <svg width="18" height="18" viewBox="0 0 61 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.08398 53L51.584 53C53.9312 53 55.834 51.0972 55.834 48.75L55.834 6.25C55.834 3.90279 53.9312 2 51.584 2L9.08399 2C6.73678 2 4.83399 3.90279 4.83399 6.25L4.83398 48.75C4.83398 51.0972 6.73677 53 9.08398 53Z" stroke="#2B3A67" strokeWidth="4" strokeLinejoin="round"/>
                        <path d="M58.667 17.5833L43.0837 17.5833L40.2503 11.9167L20.417 11.9167L17.5837 17.5833L2.00032 17.5833M4.83366 10.5L4.83366 24.6667M38.8337 36L30.3337 44.5M30.3337 44.5L21.8337 36M30.3337 44.5L30.3337 21.8333M55.8337 10.5L55.8337 24.6667" stroke="#2B3A67" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-2" style={{ fontSize: "0.75rem" }}>Fill▾</span>
                    </button>
                    {isDropdownOpen === "Fill-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div>
                <div  >
                    <PivotTableComponent />
                </div>  
            </div>
            <div className="flex flex-col">
                <div className="relative inline-block" ref={UnpivotColumnRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "UnpivotColumn-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("UnpivotColumn-file")}
                    >
                        <img src="/UnpivotColumn.png" alt="UnpivotColumn" width={22} height={22} />
                        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Unpivot Column▾</span>
                    </button>
                    {isDropdownOpen === "UnpivotColumn-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div>
                <div className="relative inline-block" ref={MoveRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "Move-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("Move-file")}
                    >
                        <img src="/Move.png" alt="Move" width={22} height={22} />
                        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Move▾</span>
                    </button>
                    {isDropdownOpen === "Move-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div>
                
            </div>
        </div>
        <p className="text-xs text-black">Any Column</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={SplitColumnRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "SplitColumn-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("SplitColumn-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M91 98H70C68.1435 98 66.363 97.2625 65.0503 95.9497C63.7375 94.637 63 92.8565 63 91V28C63 26.1435 63.7375 24.363 65.0503 23.0503C66.363 21.7375 68.1435 21 70 21H91C92.8565 21 94.637 21.7375 95.9497 23.0503C97.2625 24.363 98 26.1435 98 28V91C98 92.8565 97.2625 94.637 95.9497 95.9497C94.637 97.2625 92.8565 98 91 98ZM70 28V91H91V28H70ZM49 24.5L68.551 4.949L63.602 0L49 14.602L34.398 0L29.449 4.949L49 24.5ZM28 98H7C5.14348 98 3.36301 97.2625 2.05025 95.9497C0.737498 94.637 0 92.8565 0 91V28C0 26.1435 0.737498 24.363 2.05025 23.0503C3.36301 21.7375 5.14348 21 7 21H28C29.8565 21 31.637 21.7375 32.9497 23.0503C34.2625 24.363 35 26.1435 35 28V91C35 92.8565 34.2625 94.637 32.9497 95.9497C31.637 97.2625 29.8565 98 28 98ZM7 28V91H28V28H7Z" fill="#2B3A67"/>
                    </svg>

                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Split</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Column▾</span>
                </button>
                {isDropdownOpen === "SplitColumn-file" && (
                    <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                    <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                        </svg>
                        square
                    </li>
                    <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                        circle
                    </li>
                    </ul>
                )}
            </div>
            <div className="relative inline-block" ref={FormatRef}>
            <ColumnFormatMenu/>
            </div>
            <div className="flex flex-col">
                <div  >
                  <button
                      className=" px-1 py-1 rounded hover:bg-gray-200 flex items-center" 
                  >
                      <svg width="18" height="18" viewBox="0 0 63 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M51.0312 15.5312L54.1686 18.6686L48.4309 24.4062H62.125V28.8438H48.4309L54.1686 34.5814L51.0312 37.7188L39.9375 26.625L51.0312 15.5312Z" fill="#2B3A67"/>
                        <path d="M62.125 53.25H39.9375C38.7606 53.25 37.6319 52.7825 36.7997 51.9503C35.9675 51.1181 35.5 49.9894 35.5 48.8125V4.4375C35.5 3.2606 35.9675 2.13191 36.7997 1.29971C37.6319 0.467521 38.7606 0 39.9375 0H62.125V4.4375H39.9375V48.8125H62.125V53.25ZM22.1875 53.25H0V48.8125H22.1875V4.4375H0V0H22.1875C23.3644 0 24.4931 0.467521 25.3253 1.29971C26.1575 2.13191 26.625 3.2606 26.625 4.4375V48.8125C26.625 49.9894 26.1575 51.1181 25.3253 51.9503C24.4931 52.7825 23.3644 53.25 22.1875 53.25Z" fill="#2B3A67"/>
                        <path d="M11.0938 15.5312L7.95644 18.6686L13.6941 24.4062H0V28.8438H13.6941L7.95644 34.5814L11.0938 37.7188L22.1875 26.625L11.0938 15.5312Z" fill="#2B3A67"/>
                        </svg>
                      <span className="ml-1" style={{ fontSize: "0.75rem" }}>Merge Columns</span>
                  </button>
              </div>
              <div className="relative inline-block" ref={ExtractRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "Extract-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("Extract-file")}
                    >
                        <svg width="20" height="20" viewBox="0 0 83 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.956 31H7.68324L15.7173 7.72727H22.0582L30.081 31H24.8082L18.9787 13.0455H18.7969L12.956 31ZM12.6264 21.8523H25.081V25.6932H12.6264V21.8523ZM32.8821 31V7.72727H42.2003C43.9124 7.72727 45.3404 7.98106 46.4844 8.48864C47.6283 8.99621 48.4882 9.70076 49.0639 10.6023C49.6397 11.4962 49.9276 12.5265 49.9276 13.6932C49.9276 14.6023 49.7457 15.4015 49.3821 16.0909C49.0185 16.7727 48.5185 17.3333 47.8821 17.7727C47.2533 18.2045 46.5336 18.5114 45.723 18.6932V18.9205C46.6094 18.9583 47.4389 19.2083 48.2116 19.6705C48.992 20.1326 49.6245 20.7803 50.1094 21.6136C50.5942 22.4394 50.8366 23.4242 50.8366 24.5682C50.8366 25.803 50.5298 26.9053 49.9162 27.875C49.3101 28.8371 48.4124 29.5985 47.223 30.1591C46.0336 30.7197 44.5677 31 42.8253 31H32.8821ZM37.8026 26.9773H41.8139C43.1851 26.9773 44.1851 26.7159 44.8139 26.1932C45.4427 25.6629 45.7571 24.9583 45.7571 24.0795C45.7571 23.4356 45.6018 22.8674 45.2912 22.375C44.9806 21.8826 44.5374 21.4962 43.9616 21.2159C43.3935 20.9356 42.7154 20.7955 41.9276 20.7955H37.8026V26.9773ZM37.8026 17.4659H41.4503C42.1245 17.4659 42.723 17.3485 43.2457 17.1136C43.776 16.8712 44.1927 16.5303 44.4957 16.0909C44.8063 15.6515 44.9616 15.125 44.9616 14.5114C44.9616 13.6705 44.6624 12.9924 44.0639 12.4773C43.473 11.9621 42.6321 11.7045 41.5412 11.7045H37.8026V17.4659ZM74.5724 15.875H69.5952C69.5043 15.2311 69.3187 14.6591 69.0384 14.1591C68.7581 13.6515 68.3982 13.2197 67.9588 12.8636C67.5194 12.5076 67.0118 12.2348 66.4361 12.0455C65.8679 11.8561 65.2505 11.7614 64.5838 11.7614C63.3793 11.7614 62.33 12.0606 61.4361 12.6591C60.5421 13.25 59.849 14.1136 59.3565 15.25C58.8641 16.3788 58.6179 17.75 58.6179 19.3636C58.6179 21.0227 58.8641 22.4167 59.3565 23.5455C59.8565 24.6742 60.5535 25.5265 61.4474 26.1023C62.3414 26.678 63.3755 26.9659 64.5497 26.9659C65.2088 26.9659 65.8187 26.8788 66.3793 26.7045C66.9474 26.5303 67.4512 26.2765 67.8906 25.9432C68.33 25.6023 68.6937 25.1894 68.9815 24.7045C69.277 24.2197 69.4815 23.6667 69.5952 23.0455L74.5724 23.0682C74.4437 24.1364 74.1217 25.1667 73.6065 26.1591C73.099 27.1439 72.4134 28.0265 71.5497 28.8068C70.6937 29.5795 69.6709 30.1932 68.4815 30.6477C67.2997 31.0947 65.9626 31.3182 64.4702 31.3182C62.3944 31.3182 60.5384 30.8485 58.902 29.9091C57.2732 28.9697 55.9853 27.6098 55.0384 25.8295C54.099 24.0492 53.6293 21.8939 53.6293 19.3636C53.6293 16.8258 54.1065 14.6667 55.0611 12.8864C56.0156 11.1061 57.3111 9.75 58.9474 8.81818C60.5838 7.87879 62.4247 7.40909 64.4702 7.40909C65.8187 7.40909 67.0687 7.59848 68.2202 7.97727C69.3793 8.35606 70.4058 8.90909 71.2997 9.63636C72.1937 10.3561 72.9209 11.2386 73.4815 12.2841C74.0497 13.3295 74.4134 14.5265 74.5724 15.875ZM25.0582 46.7273V70H20.1378V51.3977H20.0014L14.6719 54.7386V50.375L20.4332 46.7273H25.0582ZM30.5895 70V66.4545L38.8736 58.7841C39.5781 58.1023 40.169 57.4886 40.6463 56.9432C41.1312 56.3977 41.4986 55.8636 41.7486 55.3409C41.9986 54.8106 42.1236 54.2386 42.1236 53.625C42.1236 52.9432 41.9683 52.3561 41.6577 51.8636C41.3471 51.3636 40.9228 50.9811 40.3849 50.7159C39.8471 50.4432 39.2372 50.3068 38.5554 50.3068C37.8433 50.3068 37.2221 50.4508 36.6918 50.7386C36.1615 51.0265 35.7524 51.4394 35.4645 51.9773C35.1766 52.5152 35.0327 53.1553 35.0327 53.8977H30.3622C30.3622 52.375 30.7069 51.053 31.3963 49.9318C32.0857 48.8106 33.0516 47.9432 34.294 47.3295C35.5365 46.7159 36.9683 46.4091 38.5895 46.4091C40.2562 46.4091 41.7069 46.7045 42.9418 47.2955C44.1842 47.8788 45.1501 48.6894 45.8395 49.7273C46.5289 50.7652 46.8736 51.9545 46.8736 53.2955C46.8736 54.1742 46.6993 55.0417 46.3509 55.8977C46.0099 56.7538 45.4001 57.7045 44.5213 58.75C43.6425 59.7879 42.4039 61.0341 40.8054 62.4886L37.4077 65.8182V65.9773H47.1804V70H30.5895ZM59.348 70.3182C57.651 70.3182 56.1397 70.0265 54.8139 69.4432C53.4957 68.8523 52.4541 68.0417 51.6889 67.0114C50.9313 65.9735 50.5412 64.7765 50.5185 63.4205H55.473C55.5033 63.9886 55.6889 64.4886 56.0298 64.9205C56.3783 65.3447 56.8404 65.6742 57.4162 65.9091C57.992 66.1439 58.6397 66.2614 59.3594 66.2614C60.1094 66.2614 60.7723 66.1288 61.348 65.8636C61.9238 65.5985 62.3745 65.2311 62.7003 64.7614C63.026 64.2917 63.1889 63.75 63.1889 63.1364C63.1889 62.5152 63.0147 61.9659 62.6662 61.4886C62.3253 61.0038 61.8329 60.625 61.1889 60.3523C60.5526 60.0795 59.795 59.9432 58.9162 59.9432H56.7457V56.3295H58.9162C59.6586 56.3295 60.3139 56.2008 60.8821 55.9432C61.4579 55.6856 61.9048 55.3295 62.223 54.875C62.5412 54.4129 62.7003 53.875 62.7003 53.2614C62.7003 52.678 62.5601 52.1667 62.2798 51.7273C62.0071 51.2803 61.6207 50.9318 61.1207 50.6818C60.6283 50.4318 60.0526 50.3068 59.3935 50.3068C58.7268 50.3068 58.117 50.428 57.5639 50.6705C57.0109 50.9053 56.5677 51.2424 56.2344 51.6818C55.901 52.1212 55.723 52.6364 55.7003 53.2273H50.9844C51.0071 51.8864 51.3897 50.7045 52.1321 49.6818C52.8745 48.6591 53.8745 47.8598 55.1321 47.2841C56.3973 46.7008 57.8253 46.4091 59.4162 46.4091C61.0223 46.4091 62.4276 46.7008 63.6321 47.2841C64.8366 47.8674 65.7723 48.6553 66.4389 49.6477C67.1132 50.6326 67.4465 51.7386 67.4389 52.9659C67.4465 54.2689 67.0412 55.3561 66.223 56.2273C65.4124 57.0985 64.3556 57.6515 63.0526 57.8864V58.0682C64.7647 58.2879 66.0677 58.8826 66.9616 59.8523C67.8632 60.8144 68.3101 62.0189 68.3026 63.4659C68.3101 64.7917 67.9276 65.9697 67.1548 67C66.3897 68.0303 65.3329 68.8409 63.9844 69.4318C62.6359 70.0227 61.0904 70.3182 59.348 70.3182Z" fill="#2B3A67"/>
                        </svg>
                        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Extract▾</span>
                    </button>
                    {isDropdownOpen === "Extract-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div>
                <div className="relative inline-block" ref={ParseRef}>
                    <button
                        className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "Parse-file" ? "bg-gray-200" : ""}`}
                        onClick={() => toggleDropdown("Parse-file")}
                    >
                        <img src="/Parse.png" alt="Parse" width={25} height={25} />
                        <span className="ml-1.5" style={{ fontSize: "0.75rem" }}>Parse▾</span>
                    </button>
                    {isDropdownOpen === "Parse-file" && (
                        <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                            </svg>
                            square
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                            circle
                        </li>
                        </ul>
                    )}
                </div> 
            </div>
            
        </div>
        
        <p className="text-xs text-black">Text Column</p>
    </div>
    
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={StatisticsRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "Statistics-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("Statistics-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 54 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.125 13.5556H10.125L20.25 30.5L10.125 47.4444H43.875V37.2778H37.125V40.6667H24.3L30.375 30.5L24.3 20.3333H37.125V23.7222H43.875V13.5556H37.125ZM0 0H54V6.77778H0V0ZM0 54.2222H54V61H0V54.2222Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Statistics▾</span>
                </button>
                {isDropdownOpen === "Statistics-file" && (
                    <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                    <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                        </svg>
                        square
                    </li>
                    <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                        circle
                    </li>
                    </ul>
                )}
            </div>
            <div className="relative inline-block" ref={StandardRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "Standard-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("Standard-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.5833 0H5.41667C3.98008 0 2.60233 0.570683 1.5865 1.5865C0.570683 2.60233 0 3.98008 0 5.41667V59.5833C0 61.0199 0.570683 62.3977 1.5865 63.4135C2.60233 64.4293 3.98008 65 5.41667 65H59.5833C61.0199 65 62.3977 64.4293 63.4135 63.4135C64.4293 62.3977 65 61.0199 65 59.5833V5.41667C65 3.98008 64.4293 2.60233 63.4135 1.5865C62.3977 0.570683 61.0199 0 59.5833 0ZM38.7089 15.4578C38.2007 14.9496 37.9152 14.2604 37.9152 13.5417C37.9152 12.823 38.2007 12.1337 38.7089 11.6255C39.217 11.1173 39.9063 10.8318 40.625 10.8318C41.3437 10.8318 42.033 11.1173 42.5411 11.6255L46.0417 15.1294L49.5422 11.6255C50.0504 11.1173 50.7396 10.8318 51.4583 10.8318C52.177 10.8318 52.8663 11.1173 53.3745 11.6255C53.8827 12.1337 54.1682 12.823 54.1682 13.5417C54.1682 14.2604 53.8827 14.9496 53.3745 15.4578L49.8706 18.9583L53.3745 22.4589C53.6261 22.7105 53.8257 23.0092 53.9619 23.338C54.0981 23.6668 54.1682 24.0191 54.1682 24.375C54.1682 24.7309 54.0981 25.0832 53.9619 25.412C53.8257 25.7408 53.6261 26.0395 53.3745 26.2911C53.1228 26.5428 52.8241 26.7424 52.4953 26.8786C52.1666 27.0147 51.8142 27.0848 51.4583 27.0848C51.1025 27.0848 50.7501 27.0147 50.4213 26.8786C50.0925 26.7424 49.7938 26.5428 49.5422 26.2911L46.0417 22.7872L42.5411 26.2911C42.033 26.7993 41.3437 27.0848 40.625 27.0848C39.9063 27.0848 39.217 26.7993 38.7089 26.2911C38.2007 25.783 37.9152 25.0937 37.9152 24.375C37.9152 23.6563 38.2007 22.967 38.7089 22.4589L42.2128 18.9583L38.7089 15.4578ZM27.0833 48.75H21.6667V54.1667C21.6667 54.885 21.3813 55.5738 20.8734 56.0817C20.3655 56.5897 19.6766 56.875 18.9583 56.875C18.24 56.875 17.5512 56.5897 17.0433 56.0817C16.5353 55.5738 16.25 54.885 16.25 54.1667V48.75H10.8333C10.115 48.75 9.42616 48.4647 8.91825 47.9567C8.41034 47.4488 8.125 46.76 8.125 46.0417C8.125 45.3234 8.41034 44.6345 8.91825 44.1266C9.42616 43.6187 10.115 43.3333 10.8333 43.3333H16.25V37.9167C16.25 37.1984 16.5353 36.5095 17.0433 36.0016C17.5512 35.4937 18.24 35.2083 18.9583 35.2083C19.6766 35.2083 20.3655 35.4937 20.8734 36.0016C21.3813 36.5095 21.6667 37.1984 21.6667 37.9167V43.3333H27.0833C27.8016 43.3333 28.4905 43.6187 28.9984 44.1266C29.5063 44.6345 29.7917 45.3234 29.7917 46.0417C29.7917 46.76 29.5063 47.4488 28.9984 47.9567C28.4905 48.4647 27.8016 48.75 27.0833 48.75ZM27.0833 21.6667H10.8333C10.115 21.6667 9.42616 21.3813 8.91825 20.8734C8.41034 20.3655 8.125 19.6766 8.125 18.9583C8.125 18.24 8.41034 17.5512 8.91825 17.0433C9.42616 16.5353 10.115 16.25 10.8333 16.25H27.0833C27.8016 16.25 28.4905 16.5353 28.9984 17.0433C29.5063 17.5512 29.7917 18.24 29.7917 18.9583C29.7917 19.6766 29.5063 20.3655 28.9984 20.8734C28.4905 21.3813 27.8016 21.6667 27.0833 21.6667ZM54.1667 54.1667H37.9167C37.1984 54.1667 36.5095 53.8813 36.0016 53.3734C35.4937 52.8655 35.2083 52.1766 35.2083 51.4583C35.2083 50.74 35.4937 50.0512 36.0016 49.5432C36.5095 49.0353 37.1984 48.75 37.9167 48.75H54.1667C54.885 48.75 55.5738 49.0353 56.0817 49.5432C56.5897 50.0512 56.875 50.74 56.875 51.4583C56.875 52.1766 56.5897 52.8655 56.0817 53.3734C55.5738 53.8813 54.885 54.1667 54.1667 54.1667ZM54.1667 43.3333H37.9167C37.1984 43.3333 36.5095 43.048 36.0016 42.5401C35.4937 42.0322 35.2083 41.3433 35.2083 40.625C35.2083 39.9067 35.4937 39.2178 36.0016 38.7099C36.5095 38.202 37.1984 37.9167 37.9167 37.9167H54.1667C54.885 37.9167 55.5738 38.202 56.0817 38.7099C56.5897 39.2178 56.875 39.9067 56.875 40.625C56.875 41.3433 56.5897 42.0322 56.0817 42.5401C55.5738 43.048 54.885 43.3333 54.1667 43.3333Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Standard▾</span>
                </button>
                {isDropdownOpen === "Standard-file" && (
                    <ul className="absolute top-full  bg-white text-black shadow-lg  w-40 z-50 border border-gray-300">
                    <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black" />
                        </svg>
                        square
                    </li>
                    <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                        <img src="/circle.png" alt="circle" style={{ width: "38px", height: "auto" }} className="px-2 max-h-full object-contain" />
                        circle
                    </li>
                    </ul>
                )}
            </div>
        </div>
        
        <p className="text-xs text-black mt-5">Number Column</p>
    </div>
    </div>
  );
};

export default TransformTab;
