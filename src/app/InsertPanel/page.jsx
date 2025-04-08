import React, { useState, useRef, useEffect} from "react";
import DataViz from "../DataViz/page";
import { Table } from "lucide-react";
import TableView from "../TableView/page";
import PieChartView from "../Piechart/page";
import BarChartView from "../Barchart/page";
import Test from "../Test/page";

const InsertPanel = ({ addTable, addTextBox  }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = (dropdownId) => {
        setIsDropdownOpen(isDropdownOpen === dropdownId ? null : dropdownId);
    };

    const [viewMode, setViewMode] = useState("table");
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const handleButtonClick = () => {
      fileInputRef.current.click(); // trigger file input click
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Uploaded file:", file);
        // คุณสามารถเอาไปแสดง preview หรือส่งไปยัง backend ได้ที่นี่
      }
    };


    useEffect(() => {
      if (imageFile && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            ctx.clearRect(0, 0, img.width, img.height);
            ctx.drawImage(img, 0, 0);
          };
          img.src = e.target.result;
        };
  
        reader.readAsDataURL(imageFile);
      }
    }, [imageFile]);

    return (
    
        <div className="relative bg-[#F5F5F5]  h-[2.5rem] flex top-[7.25rem]">

        {/* Add page */}
     <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 border-[#B3B3B3]">
        <img 
             src="/addPage.png" alt="addPage" style={{ width: '38px', height: 'auto' }} 
             className=" px-2 max-h-full object-contain "
          />
     </button>

       {/* New table */}
      <button  
      onClick={addTable}
      className="flex px-2 h-full hover:bg-[#E3E3E3] items-center text-sm  border-r-2 "
      >     
        <svg className="px-2" width="39" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.25" d="M9.42281 35.4372H4.25614C3.91357 35.4372 3.58503 35.2747 3.3428 34.9856C3.10056 34.6965 2.96448 34.3044 
          2.96448 33.8955V21.5622C2.96448 21.1533 3.10056 20.7612 3.3428 20.4721C3.58503 20.1829 3.91357 20.0205 4.25614 20.0205H9.42281C9.76538 
          20.0205 10.0939 20.1829 10.3362 20.4721C10.5784 20.7612 10.7145 21.1533 10.7145 21.5622V33.8955C10.7145 34.3044 10.5784 34.6965 10.3362 
          34.9856C10.0939 35.2747 9.76538 35.4372 9.42281 35.4372Z" fill="#2B3A67"/>
          <path d="M18.1257 35.4584H12.959C12.6165 35.4584 12.2879 35.296 12.0457 35.0069C11.8034 34.7178 11.6674 34.3256 11.6674 33.9167V3.08341C11.6674 2.67454 11.8034 2.28241 12.0457 1.99329C12.2879 1.70417 12.6165 1.54175 12.959 1.54175H18.1257C18.4683 1.54175 18.7968 1.70417 19.039 1.99329C19.2813 2.28241 19.4174 2.67454 19.4174 3.08341V33.9167C19.4174 34.3256 19.2813 34.7178 19.039 35.0069C18.7968 35.296 18.4683 35.4584 18.1257 35.4584Z" fill="#2B3A67"/>
          <path opacity="0.5" d="M26.7862 35.4371H21.6195C21.277 35.4371 20.9484 35.2747 20.7062 34.9855C20.464 34.6964 20.3279 34.3043 20.3279 33.8954V15.3954C20.3279 14.9866 20.464 14.5944 20.7062 14.3053C20.9484 14.0162 21.277 13.8538 21.6195 13.8538H26.7862C27.1288 13.8538 27.4573 14.0162 27.6996 14.3053C27.9418 14.5944 28.0779 14.9866 28.0779 15.3954V33.8954C28.0779 34.3043 27.9418 34.6964 27.6996 34.9855C27.4573 35.2747 27.1288 35.4371 26.7862 35.4371Z" fill="#2B3A67"/>
        </svg>
        new table
      </button>

     {/* Text  onClick={onAddText} */}
      <button  onClick={addTextBox}  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center"> 
        <img 
             src="/text.png" alt="text" style={{ width: '38px', height: 'auto' }} 
             className=" px-2 max-h-full object-contain "
          />
     </button>

     {/* Square */}
                <div className="relative">
                <button 
                  onClick={() => toggleDropdown("square")} 
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center"
                >
                    <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black"/>
                    </svg>

                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
     
                {isDropdownOpen === "square" && (
                    <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center ">
                          <svg className="px-2" width="39" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="20" height="20" fill="#E3E3E3" stroke="black"/>
                          </svg>
                            square
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/circle.png" alt="circle" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            circle
                        </li>
                    </ul>
                    )}
                </div>

                {/* line */}
                <div className="relative">
                <button 
                  onClick={() => toggleDropdown("line")}
                  className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                    <img 
                        src="/line.png" alt="line" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />

                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {isDropdownOpen === "line" && (
                    <ul className="absolute top-full mt-1 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300">
                        <li className="flex space-x-2 px-4 py-2 hover:bg-gray-200 cursor-pointer items-center ">
                          <img 
                            src="/line.png" alt="line" style={{ width: '38px', height: 'auto' }} 
                            className=" px-2 max-h-full object-contain "
                          />
                            line
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/arrow.png" alt="arrow" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            arrow
                        </li>

                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/curve-line.png" alt="curveLine" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            curve line
                        </li>
                    </ul>
                    )}
                </div>

                {/* Add Image */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button 
                   onClick={handleButtonClick}
                  className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2"
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.90625 22.75L17.2656 13L22.1406 17.875M6.90625 22.75H19.0938C21.113 22.75 22.75 21.113 22.75 19.0938V13M6.90625 
                    22.75C4.88696 22.75 3.25 21.113 3.25 19.0938V6.90625C3.25 4.88696 4.88696 3.25 6.90625 3.25H14.8281M22.75 6.86301L20.2574 
                    9.34375M20.2574 9.34375L17.875 6.97515M20.2574 9.34375V3.25M10.5625 8.73438C10.5625 9.74402 9.74402 10.5625 8.73438 10.5625C7.72473 
                    10.5625 6.90625 9.74402 6.90625 8.73438C6.90625 7.72473 7.72473 6.90625 8.73438 6.90625C9.74402 6.90625 10.5625 7.72473 10.5625 8.73438Z" 
                    stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* graph */}
                <DataViz viewMode={viewMode} setViewMode={setViewMode}/>
                {/* viewMode={viewMode} setViewMode={setViewMode} */}
                <div>
                  {viewMode === "table" }
                  {viewMode === "chart"}
                  {viewMode === "pie"  }
                  {viewMode === "line" }
                </div>

                {/* {loading ? (
                          <p>Loading...</p>
                        ) : selectedFile ? (
                          viewMode === "table" ? (
                            <TableView selectedFile={selectedFile} selectedColumns={selectedColumns} data={data} />
                          ) :  viewMode === "pie" ? (
                            <PieChartView pieData={pieData} width={width} height={height} />
                            ) :
                              (
                                <BarChartView chartData={chartData} selectedColumns={selectedColumns} selectedFile={selectedFile} width={width} height={height} />
                          )
                        ) : null
                        // (
                        //   <p>เริ่มสร้างภาพด้วยข้อมูลของคุณ</p>
                        // )
                        } */}

          </div>
        
    );
};

export default InsertPanel;