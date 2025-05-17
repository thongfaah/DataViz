// import React, { useState } from "react";

// const ArrangePanel = ({
//     onBringForward,
//     onBringToFront,
//     onSendBackward,
//     onSendToBack,
//     onGroup,
//     onUngroup,
//     onMerge,
//     onAlign
//   }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const toggleDropdown = (dropdownId) => {
//         setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
//     };
//     return (
    
//         <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex top-[7.25rem]">

//         {/* Bring froward */}
//         <div className="relative">
//             <button 
//                 onClick={() => toggleDropdown("Bring froward")} 
//                 className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
//             >
//             <img 
//                 src="/Bring-froward.png" alt="Bringfroward" style={{ width: '38px', height: 'auto' }} 
//                 className=" px-2 max-h-full object-contain "
//             />
        
//             Bring froward
        
//             <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
                            
//             </button>
                        
//             {isDropdownOpen === "Bring froward" && (
//                 <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300 ">
                    
//                     <li 
//                         className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                         onClick={onBringForward}
//                     >
//                         <img 
//                             src="/Bring-froward.png" alt="Bringfroward" style={{ width: '38px', height: 'auto' }} 
//                             className=" px-2 max-h-full object-contain "
//                         />
//                         Bring froward
//                     </li>
        
//                     <li 
//                         className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                         onClick={onBringToFront}
//                     >
//                         <img 
//                             src="/Bring-to-front.png" alt="Bringtofront" style={{ width: '38px', height: 'auto' }} 
//                             className=" px-2 max-h-full object-contain "
//                         />
//                         Bring to front
//                     </li>
//                     </ul>
//                             )}
//                         </div>
                        
//                          {/* Send Backward */}
//                       <div className="relative">
//                         <button 
//                           onClick={() => toggleDropdown("Send Backward")} 
//                           className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
//                         >
//                              <img 
//                                 src="/Send-Backward.png" alt="SendBackward" style={{ width: '38px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                               />
        
//                             Send Backward
        
//                             <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
                            
//                         </button>
                        
//                         {isDropdownOpen === "Send Backward" && (
//                             <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300">
                    
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={onSendBackward}
//                                 >
//                                     <img 
//                                         src="/Send-Backward.png" alt="SendBackward" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Send Backward
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={onSendToBack}
//                                 >
//                                     <img 
//                                         src="/Sent-to-Back.png" alt="SenttoBack" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Sent to Back
//                                 </li>
//                             </ul>
//                             )}
//                         </div>
        
//                          {/* Group  */}
//                       <div className="relative">
//                         <button 
//                           onClick={() => toggleDropdown("Group")} 
//                           className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
//                         >
//                              <img 
//                                 src="/Group.png" alt="Group" style={{ width: '38px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                               />
        
//                             Group 
        
//                             <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
                            
//                         </button>
                        
//                         {isDropdownOpen === "Group" && (
//                             <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[9rem] z-50 border border-gray-300">
                    
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={onGroup}
//                                 >
//                                     <img 
//                                         src="/Group.png" alt="Group" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     group
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={onUngroup}
//                                 >
//                                     <img 
//                                         src="/ungroup.png" alt="ungroup" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     ungroup
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={onMerge}
//                                 >
//                                     <img 
//                                         src="/merge.png" alt="merge" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     merge
//                                 </li>
//                             </ul>
//                             )}
//                         </div>
        
//                          {/* Align  */}
//                       <div className="relative">
//                         <button 
//                           onClick={() => toggleDropdown("Align")} 
//                           className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
//                         >
//                              <img 
//                                 src="/Align-left.png" alt="Align-left" style={{ width: '38px', height: 'auto' }} 
//                                 className=" px-2 max-h-full object-contain "
//                               />
        
//                             Align 
        
//                             <svg className="px-2" width="30" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
                            
//                         </button>
                        
//                         {isDropdownOpen === "Align" && (
//                             <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[13rem] z-50 border border-gray-300">
                    
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('left')}
//                                 >
//                                     <img 
//                                         src="/Align-left.png" alt="Align-left" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Align left
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('right')}
//                                 >
//                                     <img 
//                                         src="/Align-right.png" alt="Align-right" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Align right
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('horizontal')}
//                                 >
//                                     <img 
//                                         src="/Horizontal-center.png" alt="Horizontal-center" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Horizontal center
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('vertical')}
//                                 >
//                                     <img 
//                                         src="/Vertical-center.png" alt="Vertical-center" style={{ width: '38px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Vertical center
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('bottom')}
//                                 >
//                                     <img 
//                                         src="/Align-bottom.png" alt="Align-bottom" style={{ width: '35px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Align bottom
//                                 </li>
        
//                                 <li 
//                                     className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
//                                     onClick={() => onAlign('top')}
//                                 >
//                                     <img 
//                                         src="/Align-top.png" alt="Align-top" style={{ width: '35px', height: 'auto' }} 
//                                         className=" px-2 max-h-full object-contain "
//                                     />
//                                     Align top
//                                 </li>
//                             </ul>
//                             )}
//                         </div>
//                       </div>
        
//     );
// };

// export default ArrangePanel;

import React, { useState } from "react";

const ArrangePanel = ({
  onBringForward,
  onBringToFront,
  onSendBackward,
  onSendToBack,
  onGroup,
  onUngroup,
  onMerge,
  onAlign
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
  };

  const renderMenuItem = (icon, label, onClick) => (
    <li
      className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center"
      onClick={() => {
        onClick?.();
        setIsDropdownOpen(null);
      }}
    >
      <img src={icon} alt={label} style={{ width: '38px', height: 'auto' }} className="px-2 max-h-full object-contain" />
      {label}
    </li>
  );

  const renderAlignItem = (icon, label, alignType) =>
    renderMenuItem(icon, label, () => onAlign?.(alignType));

  return (
    <div className="relative bg-[#F5F5F5] h-[2.5rem] flex top-[7.25rem]">

      {/* Bring Forward */}
      <div className="relative">
        <button onClick={() => toggleDropdown("bringForward")} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2">
          <img src="/Bring-froward.png" alt="BringForward" style={{ width: '38px', height: 'auto' }} className="px-2 max-h-full object-contain" />
          Bring forward
          <svg className="px-2" width="30" height="11" viewBox="0 0 11 11"><path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {isDropdownOpen === "bringForward" && (
          <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300">
            {renderMenuItem("/Bring-froward.png", "Bring forward", onBringForward)}
            {renderMenuItem("/Bring-to-front.png", "Bring to front", onBringToFront)}
          </ul>
        )}
      </div>

      {/* Send Backward */}
      <div className="relative">
        <button onClick={() => toggleDropdown("sendBackward")} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2">
          <img src="/Send-Backward.png" alt="SendBackward" style={{ width: '38px', height: 'auto' }} className="px-2 max-h-full object-contain" />
          Send Backward
          <svg className="px-2" width="30" height="11" viewBox="0 0 11 11"><path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {isDropdownOpen === "sendBackward" && (
          <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-45 z-50 border border-gray-300">
            {renderMenuItem("/Send-Backward.png", "Send Backward", onSendBackward)}
            {renderMenuItem("/Sent-to-Back.png", "Sent to Back", onSendToBack)}
          </ul>
        )}
      </div>

      {/* Group */}
      <div className="relative">
        <button onClick={() => toggleDropdown("group")} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2">
          <img src="/Group.png" alt="Group" style={{ width: '38px', height: 'auto' }} className="px-2 max-h-full object-contain" />
          Group
          <svg className="px-2" width="30" height="11" viewBox="0 0 11 11"><path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {isDropdownOpen === "group" && (
          <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[9rem] z-50 border border-gray-300">
            {renderMenuItem("/Group.png", "Group", onGroup)}
            {renderMenuItem("/ungroup.png", "Ungroup", onUngroup)}
            {renderMenuItem("/merge.png", "Merge", onMerge)}
          </ul>
        )}
      </div>

      {/* Align */}
      <div className="relative">
        <button onClick={() => toggleDropdown("align")} className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2">
          <img src="/Align-left.png" alt="Align-left" style={{ width: '38px', height: 'auto' }} className="px-2 max-h-full object-contain" />
          Align
          <svg className="px-2" width="30" height="11" viewBox="0 0 11 11"><path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {isDropdownOpen === "align" && (
          <ul className="absolute top-full mt-1 ml-1 bg-white text-black shadow-lg rounded-md w-[13rem] z-50 border border-gray-300">
            {renderAlignItem("/Align-left.png", "Align left", "left")}
            {renderAlignItem("/Align-right.png", "Align right", "right")}
            {renderAlignItem("/Horizontal-center.png", "Horizontal center", "horizontal")}
            {renderAlignItem("/Vertical-center.png", "Vertical center", "vertical")}
            {renderAlignItem("/Align-bottom.png", "Align bottom", "bottom")}
            {renderAlignItem("/Align-top.png", "Align top", "top")}
          </ul>
        )}
      </div>

    </div>
  );
};

export default ArrangePanel;
