import React, { useState } from "react";

const EditPanel = ({ addTable }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [boxes, setBoxes] = useState([]);
    // const addNewBox = () => {
    //     setBoxes([...boxes, { id: Date.now(), x: 50, y: 50, width: 200, height: 150 }]);
    // };


    return (
    
            <div className="relative bg-[#F5F5F5]  h-[2.5rem] top-[7.25rem] flex z-10 overflow-visible">

             {/* undo */}
                 <button className="flex px-4 h-full hover:bg-[#E3E3E3] items-center"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.13012 18.3099H15.1301C17.8901 18.3099 20.1301 16.0699 20.1301 13.3099C20.1301 10.5499 17.8901 8.30994 15.1301 8.30994H4.13012M6.43012 10.8099L3.87012 8.24994L6.43012 5.68994" 
                        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button> 

                    {/* redo */}
                <button className="flex px-4 h-full hover:bg-[#E3E3E3] items-center border-r-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8701 18.3099H8.87012C6.11012 18.3099 3.87012 16.0699 3.87012 13.3099C3.87012 10.5499 6.11012 8.30994 8.87012 8.30994H19.8701M17.5701 
                        10.8099L20.1301 8.24994L17.5701 5.68994" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button> 

                    {/* copy and paste */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center ">
                    <img 
                        src="/paste1.png" alt="paste1" style={{ width: '30px', height: 'auto' }} 
                        className=" max-h-full object-contain "
                    />
                </button>

                <div className="relative ">
                    <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex px-1 h-full items-center border-r-2"
                    >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 4.125L5.5 6.875L8.25 4.125" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                    {isDropdownOpen && (
                    <ul className="absolute top-full mt-1 left-0 bg-white text-black shadow-lg rounded-md w-40 z-50 border border-gray-300 ">
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/paste2.png" alt="paste2" style={{ width: '35px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            paste
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/copy.png" alt="copy" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            copy
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center pl-4">
                            <img 
                                src="/cut.png" alt="cut" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            cut
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/delete.png" alt="delete" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            delete
                        </li>
                        <li className="flex px-4 py-2 hover:bg-gray-200 cursor-pointer items-center">
                            <img 
                                src="/selectall.png" alt="selectall" style={{ width: '38px', height: 'auto' }} 
                                className=" px-2 max-h-full object-contain "
                            />
                            select all
                        </li>
                    </ul>
                    )}
                </div> 
                
                    {/* add data */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm"> 
                    <img 
                        src="/add_data.png" alt="addData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Add data
                </button> 

                    {/* refresh */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 ">
                    <img 
                        src="/refresh.png" alt="refresh" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    
                </button> 

                    {/* New table */}
                   
                    <button 
                        onClick={addTable}
                        className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/newtable.png" alt="newTable" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    new table
                </button>
                

                {/* text */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/text.png" alt="text" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Text
                </button> 

                {/* Fillter */}
                <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/fillter.png" alt="Fillter" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Fillter
                </button> 

                 {/* Transform Data*/}
                 <button className="flex px-2 h-full hover:bg-[#E3E3E3] items-center border-r-2 text-sm">
                    <img 
                        src="/transform.png" alt="transformData" style={{ width: '38px', height: 'auto' }} 
                        className=" px-2 max-h-full object-contain "
                     />
                    Transform Data
                </button>
                </div>
        
    );
};

export default EditPanel;