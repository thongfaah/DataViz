import React, { useState, useRef, useEffect } from "react";
import AppendModal from '../AppendModal/page';
import { useMainData } from "../MainDataContext/page";

const HomeTab = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const newSourcesRef = useRef(null);
  const recentSourcesRef = useRef(null);
  const ManageParametersRef = useRef(null);
  const RefreshPreviweRef = useRef(null);
  const ManageRef = useRef(null);
  const ChooseColumnRef = useRef(null);
  const RemoveColumnsRef = useRef(null);
  const KeepRowsRef = useRef(null);
  const RemoveRowsRef = useRef(null);
  const SplitColumnRef = useRef(null);
  const MergeQueriesRef = useRef(null);
  const AppendQueriesRef = useRef(null);
  const [showAppend, setShowAppend] = useState(false);
  const { mainData } = useMainData();
  
  

  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        newSourcesRef.current && !newSourcesRef.current.contains(event.target) &&
        recentSourcesRef.current && !recentSourcesRef.current.contains(event.target) &&
        RefreshPreviweRef.current && !RefreshPreviweRef.current.contains(event.target) &&
        ManageRef.current && !ManageRef.current.contains(event.target) &&
        ChooseColumnRef.current && !ChooseColumnRef.current.contains(event.target) &&
        RemoveColumnsRef.current && !RemoveColumnsRef.current.contains(event.target) &&
        KeepRowsRef.current && !KeepRowsRef.current.contains(event.target) &&
        RemoveRowsRef.current && !RemoveRowsRef.current.contains(event.target) &&
        SplitColumnRef.current && !SplitColumnRef.current.contains(event.target) &&
        MergeQueriesRef.current && !MergeQueriesRef.current.contains(event.target) &&
        AppendQueriesRef.current && !AppendQueriesRef.current.contains(event.target) &&
        ManageParametersRef.current && !ManageParametersRef.current.contains(event.target)
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
      <div className="space-x-2">
        
          <button
            className="btn flex flex-col items-center"
          >
            <img src="/close&apply-file.png" alt="close&apply-file" width={30} height={30} />
            <span className="block" style={{ fontSize: "0.75rem" }}>Close &</span>
            <span className="block" style={{ fontSize: "0.75rem" }}>Apply</span>
          </button>
        <div className="text-center text-black" style={{ fontSize: "0.75rem" }}>Close</div>
      </div>
   
      <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={newSourcesRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "NewSources-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("NewSources-file")}
                >
                    <svg width="33" height="33" viewBox="0 0 133 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M131.232 44.0865L88.9135 1.7683C88.3517 1.20707 87.6848 0.762042 86.9509 0.458632C86.217 0.155222 85.4305 -0.000622596 84.6364 1.86925e-06H12.0909C8.8842 1.86925e-06 5.80883 1.27386 3.54134 3.54135C1.27386 5.80883 0 8.8842 0 12.0909V145.091C0 148.298 1.27386 151.373 3.54134 153.64C5.80883 155.908 8.8842 157.182 12.0909 157.182H120.909C124.116 157.182 127.191 155.908 129.459 153.64C131.726 151.373 133 148.298 133 145.091V48.3636C133.001 47.5695 132.845 46.783 132.541 46.0491C132.238 45.3152 131.793 44.6483 131.232 44.0865ZM90.6818 20.6377L112.362 42.3182H90.6818V20.6377ZM120.909 145.091H12.0909V12.0909H78.5909V48.3636C78.5909 49.967 79.2278 51.5047 80.3616 52.6384C81.4953 53.7722 83.033 54.4091 84.6364 54.4091H120.909V145.091ZM90.6818 96.7273C90.6818 98.3306 90.0449 99.8683 88.9111 101.002C87.7774 102.136 86.2397 102.773 84.6364 102.773H72.5455V114.864C72.5455 116.467 71.9085 118.005 70.7748 119.138C69.641 120.272 68.1034 120.909 66.5 120.909C64.8966 120.909 63.359 120.272 62.2252 119.138C61.0915 118.005 60.4545 116.467 60.4545 114.864V102.773H48.3636C46.7603 102.773 45.2226 102.136 44.0889 101.002C42.9551 99.8683 42.3182 98.3306 42.3182 96.7273C42.3182 95.1239 42.9551 93.5862 44.0889 92.4525C45.2226 91.3187 46.7603 90.6818 48.3636 90.6818H60.4545V78.5909C60.4545 76.9876 61.0915 75.4499 62.2252 74.3161C63.359 73.1824 64.8966 72.5454 66.5 72.5454C68.1034 72.5454 69.641 73.1824 70.7748 74.3161C71.9085 75.4499 72.5455 76.9876 72.5455 78.5909V90.6818H84.6364C86.2397 90.6818 87.7774 91.3187 88.9111 92.4525C90.0449 93.5862 90.6818 95.1239 90.6818 96.7273Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>New</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Sources▾</span>
                </button>
                {isDropdownOpen === "NewSources-file" && (
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
            <div className="relative inline-block" ref={recentSourcesRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "RecentSources-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("RecentSources-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 179 179" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.8334 14.9166C25.8773 14.9166 22.0832 16.4882 19.2857 19.2856C16.4883 22.083 14.9167 25.8771 14.9167 29.8333V149.167C14.9167 153.123 16.4883 156.917 19.2857 159.714C22.0832 162.512 25.8773 164.083 29.8334 164.083H92.558C100.645 168.943 109.898 171.521 119.333 171.542C133.18 171.542 146.459 166.041 156.25 156.25C166.041 146.459 171.542 133.18 171.542 119.333C171.529 108.101 167.893 97.1717 161.175 88.1695C154.457 79.1673 145.015 72.5718 134.25 69.3625V59.6666L89.5001 14.9166H29.8334ZM29.8334 29.8333H82.0417V67.125H119.333C105.487 67.125 92.2075 72.6255 82.4166 82.4164C72.6256 92.2074 67.1251 105.487 67.1251 119.333C67.1351 130.004 70.4148 140.416 76.5226 149.167H29.8334V29.8333ZM119.333 82.0416C129.224 82.0416 138.709 85.9706 145.703 92.9641C152.696 99.9576 156.625 109.443 156.625 119.333C156.625 129.224 152.696 138.709 145.703 145.702C138.709 152.696 129.224 156.625 119.333 156.625C109.443 156.625 99.9578 152.696 92.9642 145.702C85.9707 138.709 82.0417 129.224 82.0417 119.333C82.0417 109.443 85.9707 99.9576 92.9642 92.9641C99.9578 85.9706 109.443 82.0416 119.333 82.0416ZM111.875 89.5V126.792L138.8 142.902L144.393 133.802L123.063 121.198V89.5H111.875Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block  mt-0.5" style={{ fontSize: "0.75rem" }}>Recent</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Sources▾</span>
                </button>
                {isDropdownOpen === "RecentSources-file" && (
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
            <button
                className="btn flex flex-col items-center "
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
                <span className="block  mt-1.25" style={{ fontSize: "0.75rem" }}>Enter</span>
                <span className="block" style={{ fontSize: "0.75rem" }}>Data</span>
            </button>
        </div>
        <p className="text-xs text-black">New Query</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" >
                <button
                    className="btn flex flex-col items-center" 
                >
                    <svg width="35" height="35" viewBox="0 0 155 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7501 0.583374C11.6171 0.583374 7.65344 2.22518 4.731 5.14763C1.80856 8.07007 0.166748 12.0338 0.166748 16.1667V140.833C0.166748 149.482 7.10133 156.417 15.7501 156.417H62.5001V140.833H15.7501V16.1667H70.2918V55.125H109.25V78.5H124.833V47.3334L78.0834 0.583374M109.25 94.0834C108.774 94.0745 108.31 94.2337 107.939 94.5329C107.569 94.8321 107.316 95.2523 107.224 95.7196L105.744 106.005C103.406 107.018 101.147 108.264 99.1209 109.667L89.4593 105.771C88.6022 105.771 87.5892 105.771 87.0438 106.784L79.2522 120.263C78.7847 121.12 78.9405 122.133 79.7197 122.757L87.9788 129.146C87.6685 131.734 87.6685 134.35 87.9788 136.938L79.7197 143.327C79.3695 143.627 79.1324 144.038 79.0473 144.491C78.9623 144.945 79.0346 145.413 79.2522 145.82L87.0438 159.3C87.5113 160.313 88.5243 160.313 89.4593 160.313L99.1209 156.417C101.147 157.819 103.328 159.144 105.744 160.079L107.224 170.364C107.38 171.299 108.159 172 109.25 172H124.833C125.691 172 126.548 171.299 126.703 170.364L128.184 160.079C130.521 159.066 132.625 157.819 134.729 156.417L144.313 160.313C145.326 160.313 146.338 160.313 146.884 159.3L154.676 145.82C154.893 145.413 154.965 144.945 154.88 144.491C154.795 144.038 154.558 143.627 154.208 143.327L145.871 136.938C146.027 135.613 146.183 134.366 146.183 133.042C146.183 131.717 146.105 130.47 145.871 129.146L154.13 122.757C154.48 122.456 154.717 122.046 154.802 121.592C154.887 121.139 154.815 120.67 154.598 120.263L146.806 106.784C146.338 105.771 145.326 105.771 144.313 105.771L134.729 109.667C132.625 108.264 130.521 106.94 128.106 106.005L126.625 95.7196C126.576 95.2758 126.367 94.865 126.038 94.5639C125.708 94.2628 125.28 94.092 124.833 94.0834M117.042 121.354C123.509 121.354 128.729 126.575 128.729 133.042C128.729 139.509 123.509 144.729 117.042 144.729C110.497 144.729 105.354 139.509 105.354 133.042C105.354 126.575 110.575 121.354 117.042 121.354Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Data source</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>settings</span>
                </button>
                
            </div>
        </div>
        <p className="text-xs text-black">Data Sources</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={ManageParametersRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "ManageParameters-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("ManageParameters-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M53.3334 70C51.5001 70 49.9312 69.3478 48.6267 68.0433C47.3223 66.7389 46.669 65.1689 46.6667 63.3333V50C46.6667 48.1667 47.3201 46.5978 48.6267 45.2933C49.9334 43.9889 51.5023 43.3356 53.3334 43.3333H66.6667C68.5001 43.3333 70.0701 43.9867 71.3767 45.2933C72.6834 46.6 73.3356 48.1689 73.3334 50V63.3333C73.3334 65.1667 72.6812 66.7367 71.3767 68.0433C70.0723 69.35 68.5023 70.0022 66.6667 70H53.3334ZM53.3334 63.3333H66.6667V50H53.3334V63.3333ZM6.66675 60V53.3333H36.6667V60H6.66675ZM53.3334 36.6667C51.5001 36.6667 49.9312 36.0144 48.6267 34.71C47.3223 33.4056 46.669 31.8356 46.6667 30V16.6667C46.6667 14.8333 47.3201 13.2644 48.6267 11.96C49.9334 10.6556 51.5023 10.0022 53.3334 10H66.6667C68.5001 10 70.0701 10.6533 71.3767 11.96C72.6834 13.2667 73.3356 14.8356 73.3334 16.6667V30C73.3334 31.8333 72.6812 33.4033 71.3767 34.71C70.0723 36.0167 68.5023 36.6689 66.6667 36.6667H53.3334ZM53.3334 30H66.6667V16.6667H53.3334V30ZM6.66675 26.6667V20H36.6667V26.6667H6.66675Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Manage</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Parameters▾</span>
                </button>
                {isDropdownOpen === "ManageParameters-file" && (
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
        <p className="text-xs text-black">Parameters</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={RefreshPreviweRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "RefreshPreviwe-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("RefreshPreviwe-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 76 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.2333 89.1667H8.91667C4.0125 89.1667 0 85.1542 0 80.25V8.91667C0 4.0125 4.0125 0 8.91667 0H44.5833L71.3333 26.75V42.3542C68.6583 41.0167 65.5375 40.5708 62.4167 40.125V31.2083H40.125V8.91667H8.91667V80.25H33.4375C34.775 83.3708 37.0042 86.4917 39.2333 89.1667ZM57.9583 44.5833L48.15 54.3917L57.9583 64.2V57.9583C64.2 57.9583 69.1042 62.8625 69.1042 69.1042C69.1042 70.8875 68.6583 72.6708 67.7667 74.0083L72.6708 78.9125C74.4542 76.2375 75.7917 72.6708 75.7917 69.1042C75.7917 59.2958 67.7667 51.2708 57.9583 51.2708V44.5833ZM67.7667 83.8167L57.9583 73.5625V80.25C51.7167 80.25 46.8125 75.3458 46.8125 69.1042C46.8125 67.3208 47.2583 65.5375 48.15 64.2L43.2458 59.2958C41.4625 61.9708 40.125 65.5375 40.125 69.1042C40.125 78.9125 48.15 86.9375 57.9583 86.9375V93.625L67.7667 83.8167Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Refresh</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Previwe▾</span>
                </button>
                {isDropdownOpen === "RefreshPreviwe-file" && (
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
            <div className="flex flex-col">
              <div  >
                  <button
                      className="btn flex  items-center" 
                  >
                      <img src="/Properties.png" alt="Properties" width={20} height={20} />
                      <span className="ml-1" style={{ fontSize: "0.75rem" }}>Properties</span>
                  </button>
              </div>
              <div className="relative " ref={ManageRef}>
                <button
                    className={`btn flex items-center ${isDropdownOpen === "Manage-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("Manage-file")}
                >
                    <svg width="15" height="15" viewBox="0 0 95 90" fill="none" xmlns="http://www.w3.org/2000/svg "className="block  ">
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
                    <span className="ml-2" style={{ fontSize: "0.75rem" }}>Manage▾</span>
                   
                </button>
                {isDropdownOpen === "Manage-file" && (
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
        
        <p className="text-xs text-black">Query</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={ChooseColumnRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "ChooseColumn-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("ChooseColumn-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 114 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.125H114V92.75H0V0.125ZM106.875 28.625V7.25H78.375V28.625H106.875ZM42.75 7.25V28.625H71.25V7.25H42.75ZM42.75 64.25V85.625H71.25V64.25H42.75ZM42.75 57.125H71.25V35.75H42.75V57.125ZM78.375 35.75V57.125H106.875V35.75H78.375ZM78.375 85.625H106.875V64.25H78.375V85.625Z" fill="#2B3A67"/>
                    </svg>
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Choose</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Columns▾</span>
                </button>
                {isDropdownOpen === "ChooseColumn-file" && (
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
            <div className="relative inline-block" ref={RemoveColumnsRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "RemoveColumns-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("RemoveColumns-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 79 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.3333 0H52.6667V48.0352L39.5 62.0674L26.3333 47.9912V0ZM79 0V45.044H57.9333V39.4135H73.7333V0H79ZM5.26667 39.4135H21.0667V45.044H0V0H5.26667V39.4135ZM52.5432 66.0704L43.2443 76.0117L52.5432 85.9971L48.8401 89.956L39.5 80.0147L30.1599 90L26.4568 85.9971L35.7969 76.0117L26.4568 66.0264L30.1599 62.0674L39.5 72.0528L48.8401 62.0674L52.5432 66.0704Z" fill="#2B3A67"/>
                    </svg>

                    <span className="block  mt-1" style={{ fontSize: "0.75rem" }}>Remove</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Columns▾</span>
                </button>
                {isDropdownOpen === "RemoveColumns-file" && (
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
        <p className="text-xs text-black">Manage Columns</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            <div className="relative inline-block" ref={KeepRowsRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "KeepRows-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("KeepRows-file")}
                >
                    <img src="/KeepRows.png" alt="KeepRows" width={35} height={35} />
                    <span className="block mt-1" style={{ fontSize: "0.75rem" }}>Keep</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Rows▾</span>
                </button>
                {isDropdownOpen === "KeepRows-file" && (
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
            <div className="relative inline-block" ref={RemoveRowsRef}>
                <button
                    className={`btn flex flex-col items-center ${isDropdownOpen === "RemoveRows-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("RemoveRows-file")}
                >
                    <svg width="35" height="35" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72.75 90.9375H12.125C10.5171 90.9375 8.9751 90.2988 7.83816 89.1618C6.70123 88.0249 6.0625 86.4829 6.0625 84.875V66.6875C6.0625 65.0796 6.70123 63.5376 7.83816 62.4007C8.9751 61.2637 10.5171 60.625 12.125 60.625H72.75C74.3579 60.625 75.8999 61.2637 77.0368 62.4007C78.1738 63.5376 78.8125 65.0796 78.8125 66.6875V84.875C78.8125 86.4829 78.1738 88.0249 77.0368 89.1618C75.8999 90.2988 74.3579 90.9375 72.75 90.9375ZM12.125 66.6875H12.1189L12.125 84.875H72.75V66.6875H12.125ZM90.9375 10.3366L86.6634 6.0625L75.7812 16.9447L64.8991 6.0625L60.625 10.3366L71.5072 21.2188L60.625 32.1009L64.8991 36.375L75.7812 25.4928L86.6634 36.375L90.9375 32.1009L80.0553 21.2188L90.9375 10.3366Z" fill="#2B3A67"/>
                    <path d="M12.125 42.4375V24.25H54.5625V18.1875H12.125C10.5171 18.1875 8.9751 18.8262 7.83816 19.9632C6.70123 21.1001 6.0625 22.6421 6.0625 24.25V42.4375C6.0625 44.0454 6.70123 45.5874 7.83816 46.7243C8.9751 47.8613 10.5171 48.5 12.125 48.5H78.8125V42.4375H12.125Z" fill="#2B3A67"/>
                    </svg>

                    <span className="block  mt-1" style={{ fontSize: "0.75rem" }}>Remove</span>
                    <span className="block" style={{ fontSize: "0.75rem" }}>Rows▾</span>
                </button>
                {isDropdownOpen === "RemoveRows-file" && (
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
        <p className="text-xs text-black">Reduce Rows</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            
            <div className="flex flex-col">
              <div  >
                  <button
                      className="btn flex  items-center" 
                  >
                      <svg width="18" height="18" viewBox="0 0 58 59" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.3003 50.2074V0H16.1337V50.2026L24.1667 42.8197L27.434 46.39L13.717 59L0 46.39L3.26733 42.8197L11.3003 50.2074ZM41.702 0.435997H50.1313L54.8728 16.282L54.9695 16.5291C55.4603 17.8058 55.9276 19.0914 56.3712 20.3853C56.7578 21.5092 57.1493 22.7445 57.449 23.8732C57.7293 24.9196 58 26.1259 58 27.0802H53.1667C53.1667 26.8235 53.0603 26.1743 52.78 25.1231C52.4859 24.0554 52.1587 22.9972 51.7988 21.95C51.5182 21.129 51.2266 20.3119 50.924 19.4987H40.9093C40.6532 20.1866 40.3438 21.0441 40.0345 21.95C39.6672 23.0255 39.3095 24.1445 39.0533 25.1231C38.773 26.1743 38.6667 26.8235 38.6667 27.0802H33.8333C33.8333 26.1259 34.104 24.9196 34.3843 23.8684C34.684 22.7445 35.0755 21.5092 35.4622 20.3853C35.9047 19.091 36.372 17.8054 36.8638 16.5291L36.9605 16.2869L41.702 0.435997ZM42.4947 14.6543H49.3387L46.5353 5.2804H45.298L42.4947 14.6543ZM33.8333 34.3468H58V40.4023L40.2762 53.7244H58V58.5688H33.8333V52.5133L51.5572 39.1912H33.8333V34.3468Z" fill="#2B3A67"/>
                      </svg>
                  </button>
              </div>
              <div  >
                  <button
                      className="btn flex  items-center" 
                  >
                      <svg width="24" height="24" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.1654 51.3973V7.99805H22.3529V51.3931L29.3125 45.0114L32.1433 48.0975L20.2591 58.9976L8.375 48.0975L11.2058 45.0114L18.1654 51.3973ZM37.6875 8.37492H56.5312V13.4292L42.7418 27.2187H56.5312V31.4062H37.6875V26.3519L51.4769 12.5624H37.6875V8.37492ZM44.6471 35.5937H49.714L53.9015 49.5632L53.9853 49.76C54.3993 50.8225 54.7916 51.8933 55.1619 52.9718C55.4844 53.9098 55.8152 54.9441 56.0664 55.8947C56.3051 56.7824 56.5312 57.8 56.5312 58.6249H52.3438C52.2922 58.0641 52.1841 57.51 52.0213 56.9709C51.7768 56.0827 51.5031 55.2028 51.2006 54.3327C50.9493 53.5999 50.6981 52.9048 50.4887 52.3437H42.3147C42.0216 52.9341 41.6447 53.7046 41.2678 54.5212C40.8697 55.3765 40.5078 56.2483 40.1832 57.1342C40.0381 57.539 39.932 57.8823 39.865 58.1643L39.7938 58.4993L39.7812 58.6249H35.5938C35.5938 57.7037 35.9246 56.6149 36.2386 55.7355C36.6029 54.7347 37.0095 53.7498 37.4572 52.7834C37.9562 51.6955 38.4826 50.6203 39.0359 49.559L39.1364 49.3705L44.6471 35.5937ZM44.1321 48.1562H49.111L46.9754 41.0374L44.1321 48.1562Z" fill="#2B3A67"/>
                      </svg>
                  </button>
              </div>
            </div>
        </div>
        
        <p className="text-xs text-black mt-5">Sort</p>
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
            <button
                className="btn flex flex-col items-center "
            >
                <img src="/GroupBy.png" alt="GroupBy" width={42} height={42} />
                <span className="block  mt-3" style={{ fontSize: "0.75rem" }}>Group</span>
                <span className="block" style={{ fontSize: "0.75rem" }}>By</span>
            </button>
            <div className="flex flex-col">
              <div >
                <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex items-center"
                >
                    <select className="px-0 py-0 rounded" style={{ fontSize: "0.75rem" }}>
                      <option>Data Type: Whole Numner</option>
                      <option>Data Type: Manage</option>
                    </select>
                   
                </button>
              </div>
              <div >
                <button
                    className="px-1 py-1 rounded hover:bg-gray-200 flex items-center"
                >
                    <select className="px-0 py-0 rounded" style={{ fontSize: "0.75rem" }}>
                      <option>Use First Row as Headers</option>
                      <option>Use First Row as Headers</option>
                    </select>
                   
                </button>
              </div>
              <div  >
                  <button
                      className=" px-1 py-1 rounded hover:bg-gray-200 flex items-center" 
                  >
                      <svg width="22" height="22" viewBox="0 0 154 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M31.0021 35.9879L52.7642 57.827L74.1125 36.421L67.375 29.6835L57.6345 39.3759L57.5575 23.9759C57.5488 22.6733 58.0453 21.4181 58.9427 20.474C59.8402 19.5299 61.0687 18.9704 62.37 18.9131H77V9.625H62.37C60.492 9.62497 58.6325 9.99627 56.8986 10.7176C55.1646 11.4389 53.5904 12.4959 52.2665 13.8278C50.9426 15.1598 49.8951 16.7404 49.1844 18.4787C48.4736 20.217 48.1136 22.0787 48.125 23.9566V39.4625L37.7974 29.1926L31.0021 35.9879ZM95.2009 53.2551H95.2971C97.0553 56.2517 99.6412 57.75 103.055 57.75C106.841 57.75 109.857 56.1362 112.102 52.9086C114.374 49.681 115.506 45.4043 115.5 40.0785C115.5 35.1633 114.534 31.2909 112.603 28.4611C110.665 25.625 107.906 24.2069 104.325 24.2069C100.424 24.2069 97.4146 26.0709 95.2971 29.799H95.2009V9.625H86.625V56.9704H95.1913L95.2009 53.2551ZM95.0565 43.043V39.7705C95.0565 37.3835 95.618 35.4553 96.7409 33.9859C97.2229 33.2984 97.8643 32.7378 98.6102 32.3523C99.3561 31.9668 100.184 31.7677 101.024 31.7721C101.859 31.7404 102.688 31.9314 103.426 32.3254C104.163 32.7195 104.783 33.3025 105.221 34.0147C106.215 35.4906 106.712 37.5535 106.712 40.2036C106.712 43.3863 106.17 45.8503 105.086 47.5956C104.644 48.4029 103.987 49.0726 103.189 49.531C102.391 49.9895 101.482 50.219 100.562 50.1944C99.7879 50.199 99.0241 50.0168 98.3354 49.6632C97.6468 49.3097 97.0535 48.7952 96.6061 48.1635C95.5338 46.6773 94.9818 44.8741 95.0565 43.043ZM86.625 122.902C84.161 124.384 80.6062 125.125 75.9605 125.125C70.5384 125.125 66.1462 123.415 62.7839 119.995C59.428 116.575 57.75 112.167 57.75 106.77C57.75 100.533 59.5467 95.6244 63.14 92.0439C66.7462 88.4313 71.5587 86.625 77.5775 86.625C81.7483 86.625 84.7642 87.1993 86.625 88.3479V97.9536C84.4619 96.2236 81.7718 95.2861 79.002 95.2971C75.8707 95.2971 73.3874 96.2532 71.5523 98.1654C69.7299 100.052 68.822 102.67 68.8284 106.019C68.8284 109.266 69.701 111.823 71.4464 113.691C73.1981 115.532 75.6012 116.453 78.6555 116.453C81.3697 116.453 84.0262 115.567 86.625 113.796V122.902ZM38.5 67.375L28.875 77V134.75L38.5 144.375H105.875L115.5 134.75V77L105.875 67.375H38.5ZM38.5 77H105.875V134.75H38.5V77Z" fill="#2B3A67"/>
                      </svg>
                      <span className="ml-1" style={{ fontSize: "0.75rem" }}>Replace Values</span>
                  </button>
              </div>  
            </div>
        </div>
        
        <p className="text-xs text-black">Transform</p>
    </div>
    <div className="flex flex-col items-center border-l pl-4">
        <div className="flex space-x-2 ">
            
            <div className="flex flex-col">
              <div className="relative " ref={MergeQueriesRef}>
                <button
                    className={`px-1 py-1 rounded hover:bg-gray-200 flex items-center ${isDropdownOpen === "MergeQueries-file" ? "bg-gray-200" : ""}`}
                    onClick={() => toggleDropdown("MergeQueries-file")}
                >
                    <img src="/MergeQueries.png" alt="GroupBy" width={22} height={22} />
                    <span className="ml-2" style={{ fontSize: "0.75rem" }}>Merge Queries▾</span>
                   
                </button>
                {isDropdownOpen === "MergeQueries-file" && (
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
                  <button
                      className="px-1 py-1 rounded hover:bg-gray-200 flex  items-center" 
                      onClick={() => setShowAppend(true)}
                  >
                      <svg width="18" height="18" viewBox="0 0 165 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M103.125 20.6667L103.125 -2.70464e-06L165 0L165 82.6667L144.375 82.6667L144.375 20.6667L103.125 20.6667ZM20.625 165.333L20.625 103.333L1.07419e-05 103.333L7.12847e-06 186L61.875 186L61.875 165.333L20.625 165.333ZM20.625 20.6667L61.875 20.6667L61.875 -4.50774e-06L1.52588e-05 -7.21238e-06L1.16453e-05 82.6667L20.625 82.6667L20.625 20.6667ZM165 186L165 103.333L144.375 103.333L144.375 165.333L103.125 165.333L103.125 186L165 186ZM72.1875 51.6667L51.5625 51.6667L82.5 82.6667L113.438 51.6667L92.8125 51.6667L92.8125 -3.15542e-06L72.1875 -4.05696e-06L72.1875 51.6667ZM92.8125 134.333L113.437 134.333L82.5 103.333L51.5625 134.333L72.1875 134.333L72.1875 186L92.8125 186L92.8125 134.333Z" fill="#2B3A67"/>
                    </svg>

                      <span className="ml-2.5" style={{ fontSize: "0.75rem" }}>Append Queries</span>
                  </button>
                  {showAppend && (
                    <AppendModal onClose={() => setShowAppend(false)} mainData={mainData} />
                  )}
              </div> 
              <div  >
                  <button
                      className="px-1 py-1 rounded hover:bg-gray-200 flex  items-center" 
                  >
                      <svg width="18" height="18" viewBox="0 0 142 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M142 95.625V57.375H44.375V66.9375H26.625V38.25H106.5V0H0V38.25H17.75V133.875H44.375V153H142V114.75H44.375V124.312H26.625V76.5H44.375V95.625H142Z" fill="#2B3A67"/>
                      </svg>

                      <span className="ml-2.5" style={{ fontSize: "0.75rem" }}>Combine Files</span>
                  </button>
              </div> 
            </div>
        </div>
        
        <p className="text-xs text-black mt-2">Combine</p>
    </div>
    </div>
  );
};

export default HomeTab;
