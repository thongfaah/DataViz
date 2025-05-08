// "use client"
// import { Rnd } from 'react-rnd';
// import React, { useState, useEffect, useRef } from "react";
// import SidebarText from '../SidebarText/page';
// import { ChevronRight, ChevronLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, PaintBucket, Paintbrush } from "lucide-react";

// const TextBox = ({ text, onChange, style, onDelete, isSelected, onSelect, id }) => {
//   // const [isSelected, setIsSelected] = useState(false);
//   // const [showSidebar, setShowSidebar] = useState(true);
//   const [size, setSize] = useState("20");
//   const [font, setFont] = useState("Inner");
//   const [color, setColor] = useState("#000000");
//   const [fade, setFade] = useState("100%");
//   const [borderWeight, setBorderWeight] = useState("1");
//   const [borderStyle, setBorderStyle] = useState("Solid");
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [textAlign, setTextAlign] = useState("left");
//   const [backgroundColor, setBackgroundColor] = useState("#ffffff");
//   const colorInputRef = useRef(null);
//   const [borderColor, setBorderColor] = useState("#000000");
//   const [borderRadius, setBorderRadius] = useState("0");

//   const handleColorClick = () => {
//     colorInputRef.current.click();
//   };

//   const getOpacityValue = (fade) => {
//     switch (fade) {
//       case "100%": return 1;
//       case "75%": return 0.75;
//       case "50%": return 0.5;
//       case "25%": return 0.25;
//       default: return 1;
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (isSelected && e.key === "Delete") {
//         onDelete();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isSelected, onDelete]);

//   return (
//     <div>
//     <Rnd
      
//       default={{
//         x: style?.left || 100,
//         y: style?.top || 100,
//         width: style?.width || 200,
//         height: style?.height || 100,
//       }}
//       enableResizing={{
//         top: true,
//         right: true,
//         bottom: true,
//         left: true,
//         topRight: true,
//         bottomRight: true,
//         bottomLeft: true,
//         topLeft: true,
//       }}
//       // className="shadow-lg"
//       onClick={onSelect}
//       // onBlur={() => setIsSelected(false)}
//     >
//       <div
//         className={`relative bg-white  w-full h-full cursor-move ${isSelected ? "border-2 border-black" : "border"}`}
//         tabIndex={0}
//         style={{
//           borderColor: borderColor,
//           borderStyle: borderStyle.toLowerCase(),
//           borderWidth: `${borderWeight}px`,
//           borderRadius: `${borderRadius}px`,
//           overflow: "hidden", 
//           boxSizing: "border-box", 
//           backgroundColor: "white", 
//         }}
//         onClick={onSelect}
//         // onBlur={() => setIsSelected(false)}
//         onContextMenu={(e) => {
//           e.preventDefault();
//           if (window.confirm("ลบกล่องข้อความนี้?")) {
//             onDelete();
//           }
//         }}
//       >
//         <textarea
//           value={text}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full h-full resize-none border-none outline-none"
//           style={{
//             fontSize: `${size}px`,
//             fontFamily: font,
//             color: color,
//             fontWeight: isBold ? "bold" : "normal",
//             fontStyle: isItalic ? "italic" : "normal",
//             textDecoration: isUnderline ? "underline" : "none",
//             textAlign: textAlign,
//             backgroundColor: backgroundColor,
//             opacity: getOpacityValue(fade),
//           }}
//           onFocus={onSelect}
//         />
//       </div>
//     </Rnd>

//      {/* Sidebar Panel (Right Side) */}
     
//      {isSelected && (
//       <div className="z-[1000]">
//         <SidebarText
//           size={size} setSize={setSize}
//           font={font} setFont={setFont}
//           color={color} setColor={setColor}
//           fade={fade} setFade={setFade}
//           isBold={isBold} setIsBold={setIsBold}
//           isItalic={isItalic} setIsItalic={setIsItalic}
//           isUnderline={isUnderline} setIsUnderline={setIsUnderline}
//           textAlign={textAlign} setTextAlign={setTextAlign}
//           backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
//           borderColor={borderColor} setBorderColor={setBorderColor}
//           borderRadius={borderRadius} setBorderRadius={setBorderRadius}
//           borderWeight={borderWeight} setBorderWeight={setBorderWeight}
//           borderStyle={borderStyle} setBorderStyle={setBorderStyle}
//         />
//       </div>
//     )}

//      {/* <div className="relative">
//         {showSidebar && (
//           <div className="w-64 bg-white border-l p-4 shadow-lg fixed right-0 top-[0rem] h-[32.1rem] flex flex-col overflow-y-auto">
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold text-[#2B3A67]">Text</h2>
//               <button
//                 className="p-2 rounded  hover:bg-gray-100"
//                 onClick={() => setShowSidebar(false)}
//               >
//                 <svg width="20" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M13.5417 17.7083L18.75 12.5L13.5417 7.29163M6.25 17.7083L11.4583 12.5L6.25 7.29163" stroke="#2B3A67" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div> */}

//             {/* Style Controls */}
//             {/* <div className="border-t pt-2 pb-3">
//               <h3 className="font-semibold text-[#2B3A67]">Style</h3>
//               <div className="flex gap-2 my-2 items-center">
//                 <h3 className="p-2 text-sm">size:</h3>
//                 <input
//                   type="number"
//                   className="border p-1 rounded text-sm w-20"
//                   value={size}
//                   onChange={(e) => setSize(e.target.value)}
//                   min="1"
//                 />
//                 <datalist id="font-sizes">
//                   {[10, 14, 18, 20, 24].map((s) => (
//                     <option key={s} value={s} />
//                   ))}
//                 </datalist> */}
               

//                 {/* Color Picker with hover/focus reveal */}
//                 {/* <div className="relative group flex items-center">
//                   <h3 className="p-2 text-sm">color :</h3>
//                   <button
//                     className="p-1 rounded text-sm font-medium"
//                     style={{ color: color, border: "none" }}
//                     onClick={handleColorClick}
//                   >
//                     A
//                   </button>
//                   <input
//                     ref={colorInputRef}
//                     type="color"
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}
//                     className="absolute left-0 top-full w-full h-0.5 border-0 p-0 appearance-none cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
//                     style={{ backgroundColor: color }}
//                   />
//                 </div>
//               </div>

//               <div className="relative flex ">
//               <h3 className="p-2 text-sm">font :</h3>
//               <select className="border p-1 rounded  text-sm" value={font} onChange={(e) => setFont(e.target.value)}>
//                 <option value="Arial">Arial</option>
//                 <option value="Helvetica">Helvetica</option>
//                 <option value="Times New Roman">Times New Roman</option>
//                 <option value="Georgia">Georgia</option>
//                 <option value="Courier New">Courier New</option>
//                 <option value="Verdana">Verdana</option>
//                 <option value="Tahoma">Tahoma</option>
//                 <option value="Trebuchet MS">Trebuchet MS</option>
//               </select>
//               </div>

              
//               <div className="flex gap-8 my-2 justify-center">
//                 <button 
//                   className={`border p-2 rounded ${isBold ? "bg-gray-300" : ""}`}
//                   onClick={() => setIsBold(!isBold)}
//                 >
//                   <Bold className="w-3 h-3" />
//                 </button>

//                 <button 
//                    className={`border p-2 rounded ${isItalic ? "bg-gray-300" : ""}`}
//                    onClick={() => setIsItalic(!isItalic)}
//                 >
//                   <Italic className="w-3 h-3" />
//                 </button>

//                 <button 
//                   className={`border p-2 rounded ${isUnderline ? "bg-gray-300" : ""}`}
//                   onClick={() => setIsUnderline(!isUnderline)}
//                 >
//                   <Underline className="w-3 h-3" />
//                 </button>
//               </div>

//               <div className="flex gap-2 bg-gray-200 p-1 rounded justify-center">
//                 <button 
//                   className={`border p-2 w-full rounded ${textAlign === "left" ? "bg-gray-300" : ""}`}
//                   onClick={() => setTextAlign("left")}
//                 >
//                   <AlignLeft className="w-3 h-3" />
//                 </button>

//                 <button 
//                   className={`border p-2 w-full rounded ${textAlign === "center" ? "bg-gray-300" : ""}`}
//                   onClick={() => setTextAlign("center")}
//                 >
//                   <AlignCenter className="w-3 h-3" />
//                 </button>

//                 <button 
//                    className={`border p-2 w-full rounded ${textAlign === "right" ? "bg-gray-300" : ""}`}
//                   onClick={() => setTextAlign("right")}
//                 >
//                   <AlignRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>

//             <div className="border-t pt-3 pb-3">
//               <h3 className="font-semibold text-[#2B3A67]">Background</h3>
//               <div className="flex gap-5 my-2 items-center">
//                   <PaintBucket className="w-4 h-4" />
//                 <input
//                   type="color"
//                   value={backgroundColor}
//                   onChange={(e) => setBackgroundColor(e.target.value)}
//                   className="w-8 h-7 p-0 cursor-pointer"
//                 />
//                 <h3 className=" text-sm">fade : </h3>
//                 <select
//                   className="border p-1 rounded w-[5rem] text-sm"
//                   value={fade}
//                   onChange={(e) => setFade(e.target.value)}
//                 >
//                   {["100%", "75%", "50%", "25%"].map((f) => (
//                     <option key={f} value={f}>{f}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//            <div className="border-t pt-3">
//             <h3 className="font-semibold text-[#2B3A67]">Border</h3> */}

//             {/* แถวแรก: สีเส้น, border-radius */}
//             {/* <div className="flex gap-[4rem] items-center mb-3"> */}
//               {/* ปุ่มเลือกสี */}
//               {/* <div className="flex items-center gap-2"> */}
//                 {/* <img 
//                     src="/border.png" alt="Border" style={{ width: '16px', height: 'auto' }} 
//                     className="max-w-full max-h-full object-contain"
//                 />
//                 <input
//                   type="color"
//                   value={borderColor}
//                   onChange={(e) => setBorderColor(e.target.value)}
//                   className="w-6 h-6 cursor-pointer"
//                 />
//               </div> */}

//               {/* ปรับ border-radius */}
//               {/* <div className="flex items-center gap-2">
//                 <img 
//                     src="/changeborder.png" alt="changborder" style={{ width: '16px', height: 'auto' }} 
//                     className="max-w-full max-h-full object-contain"
//                 />
//                 <select
//                   className="border p-1 rounded text-sm"
//                   value={borderRadius}
//                   onChange={(e) => setBorderRadius(e.target.value)}
//                 >
//                   {[0, 4, 8, 12, 16, 24, 32].map((r) => (
//                     <option key={r} value={r}>{r}</option>
//                   ))}
//                 </select>
//               </div>
//             </div> */}

//             {/* แถวสอง: weight + style */}
//             {/* <div className="flex gap-4 items-center">
//               <div className="flex items-center gap-2">
//                 <label className="text-sm">weight :</label>
//                 <select
//                   className="border p-1 rounded text-sm"
//                   value={borderWeight}
//                   onChange={(e) => setBorderWeight(e.target.value)}
//                 >
//                   {[0, 1, 2, 3].map((w) => (
//                     <option key={w} value={w}>{w}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <img 
//                     src="/styleborder.png" alt="styleborder" style={{ width: '20px', height: 'auto' }} 
//                     className="max-w-full max-h-full object-contain"
//                 />
//                 <select
//                   className="border p-1 rounded text-sm"
//                   value={borderStyle}
//                   onChange={(e) => setBorderStyle(e.target.value)}
//                 >
//                   {["Solid", "Dashed", "Dotted"].map((s) => (
//                     <option key={s} value={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>
//               </div>

           
//           </div> */}
//           {/* </div>
//         )}

//         {!showSidebar && (
//           <button
//             className="fixed right-0 transform -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 rounded-l"
//             onClick={() => setShowSidebar(true)}
//           >
//             <ChevronLeft className="w-4 h-4"/>
//           </button>
//         )}
//       </div> */}
//   </div>
//   );
// };

// export default TextBox;

// "use client";
// import { Rnd } from "react-rnd";
// import React, { useEffect } from "react";

// const TextBox = ({ text, onChange, style, onDelete, isSelected, onSelect }) => {
//   const {
//     left = 100,
//     top = 100,
//     width = 200,
//     height = 100,
//     size = "20",
//     font = "Arial",
//     color = "#000000",
//     fade = "100%",
//     isBold = false,
//     isItalic = false,
//     isUnderline = false,
//     textAlign = "left",
//     backgroundColor = "#ffffff",
//     borderColor = "#000000",
//     borderStyle = "Solid",
//     borderWeight = "1",
//     borderRadius = "0",
//   } = style || {};

//   const getOpacityValue = (fade) => {
//     switch (fade) {
//       case "100%": return 1;
//       case "75%": return 0.75;
//       case "50%": return 0.5;
//       case "25%": return 0.25;
//       default: return 1;
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (isSelected && e.key === "Delete") {
//         onDelete();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isSelected, onDelete]);

//   return (
//     <Rnd
//       default={{ x: left, y: top, width, height }}
//       onClick={(e) => {
//         e.stopPropagation();
//         onSelect();
//       }}
//     >
//       <div
//         className={`relative w-full h-full ${isSelected ? "border-2 border-black" : "border"}`}
//         style={{
//           borderColor,
//           borderStyle: borderStyle.toLowerCase(),
//           borderWidth: `${borderWeight}px`,
//           borderRadius: `${borderRadius}px`,
//           backgroundColor,
//           overflow: "hidden",
//         }}
//         onClick={(e) => {
//           e.stopPropagation();
//           onSelect();
//         }}
//       >
//         <textarea
//           value={text}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full h-full resize-none border-none outline-none"
//           style={{
//             fontSize: `${size}px`,
//             fontFamily: font,
//             color,
//             fontWeight: isBold ? "bold" : "normal",
//             fontStyle: isItalic ? "italic" : "normal",
//             textDecoration: isUnderline ? "underline" : "none",
//             textAlign,
//             backgroundColor,
//             opacity: getOpacityValue(fade),
//           }}
//           onFocus={onSelect}
//         />
//       </div>
//     </Rnd>
//   );
// };

// export default TextBox;


"use client";

import { Rnd } from "react-rnd";
import React, { useEffect } from "react";

const TextBox = ({
  text,
  onChange,
  onDelete,
  onSelect,
  isSelected,
  posX = 100,
  posY = 100,
  width = 200,
  height = 100,
  onUpdatePosition,
  onUpdateSize,
  style = {},
}) => {
  const {
    size = "20",
    font = "Arial",
    color = "#000000",
    fade = "100%",
    isBold = false,
    isItalic = false,
    isUnderline = false,
    textAlign = "left",
    backgroundColor = "#ffffff",
    borderColor = "#000000",
    borderStyle = "Solid",
    borderWeight = "1",
    borderRadius = "0",
  } = style;

  const getOpacityValue = (fade) => {
    switch (fade) {
      case "100%": return 1;
      case "75%": return 0.75;
      case "50%": return 0.5;
      case "25%": return 0.25;
      default: return 1;
    }
  };

  // ลบ text เมื่อกด Delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSelected && e.key === "Delete") {
        onDelete();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, onDelete]);

  return (
    <Rnd
      size={{ width, height }}
      position={{ x: posX, y: posY }}
      onDragStop={(e, d) => {
        onUpdatePosition?.(d.x, d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newWidth = parseInt(ref.style.width, 10);
        const newHeight = parseInt(ref.style.height, 10);
        onUpdateSize?.(newWidth, newHeight);
        onUpdatePosition?.(position.x, position.y);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      enableResizing={!style.isLocked}
      disableDragging={style.isLocked}
    >
      <div
        className={`relative w-full h-full ${isSelected ? "border-2 border-black" : "border"}`}
        style={{
          borderColor,
          borderStyle: borderStyle.toLowerCase(),
          borderWidth: `${borderWeight}px`,
          borderRadius: `${borderRadius}px`,
          backgroundColor,
          overflow: "hidden",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full resize-none border-none outline-none"
          style={{
            fontSize: `${size}px`,
            fontFamily: font,
            color,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            textAlign,
            backgroundColor,
            opacity: getOpacityValue(fade),
          }}
          onFocus={onSelect}
        />
      </div>
    </Rnd>
  );
};

export default TextBox;
