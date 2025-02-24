"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/page'
import Nav1 from '../navbar/page';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Project = () => {

    const [activeButton, setActiveButton] = useState(null);
        const router = useRouter();
    
        useEffect(() => {
            const savedActiveButton = localStorage.getItem("activeButton");
            if (savedActiveButton !== null) {
                setActiveButton(Number(savedActiveButton));
            }
        }, []);
    
        const handleClick = (index) => {
            setActiveButton(index);
            localStorage.setItem("activeButton", index); 
        };
    
    return (
        <div className="fixed top-0 left-0 w-full z-50">
        <Nav1 />
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col relative min-h-screen w-full sm:w-1/5 bg-[#F5F5F5] ml-[5.5rem] rounded">
                <h1 className="absolute top-14 left-12 text-2xl font-bold text-[#2B3A67] w-full max-w-full">
                    My Project
                </h1>
                <div className="absolute top-32 w-full">
                    <div className="w-full">
                    {/* {[0].map((index) => (
                            
                            <button
                            key={index}
                            onClick={() => {
                                handleClick(index);
                                router.push("/lastFile");
                            }} 
                            
                            className={`flex items-center bg-[#D9D9D9] rounded p-2 w-full sm:w-[250px] relative left-[3rem] ${
                                activeButton === index ? "bg-[#f3f2f2] shadow" : "bg-[#D9D9D9] text-lg font-bold text-[#1E1E1E] relative left-[2.5rem]"
                            }`}
                            >
                               <svg 
                                className="mr-5 relative top-1 left-[2rem]"
                                width="32" 
                                height="32" 
                                viewBox="0 0 48 48" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M26.8036 25.2924C27.3275 25.4671 27.8938 25.1839 28.0685 24.66C28.2431 24.136 27.96 23.5697 27.436 23.3951L26.8036 25.2924ZM21.3542 22.4219H20.3542C20.3542 22.8523 20.6296 23.2344 21.0379 23.3706L21.3542 22.4219ZM22.3542 14.3857C22.3542 13.8334 21.9064 13.3857 21.3542 13.3857C20.8019 13.3857 20.3542 13.8334 20.3542 14.3857H22.3542ZM27.436 23.3951L21.6704 21.4732L21.0379 23.3706L26.8036 25.2924L27.436 23.3951ZM22.3542 22.4219V14.3857H20.3542V22.4219H22.3542ZM35.7292 20.5C35.7292 28.4391 29.2933 34.875 21.3542 34.875V36.875C30.3978 36.875 37.7292 29.5437 37.7292 20.5H35.7292ZM21.3542 34.875C13.4151 34.875 6.97916 28.4391 6.97916 20.5H4.97916C4.97916 29.5437 12.3105 36.875 21.3542 36.875V34.875ZM6.97916 20.5C6.97916 12.5609 13.4151 6.125 21.3542 6.125V4.125C12.3105 4.125 4.97916 11.4563 4.97916 20.5H6.97916ZM21.3542 6.125C29.2933 6.125 35.7292 12.5609 35.7292 20.5H37.7292C37.7292 11.4563 30.3978 4.125 21.3542 4.125V6.125Z" 
                                    fill="black"
                                />
                            </svg>
                                ล่าสุด
                            </button>
                            
                        ))} */}
                        <li className='flex items-center bg-[#D9D9D9] rounded p-2 w-full sm:w-[250px] relative left-[3rem]'>
                            <svg 
                                className="mr-5 relative top-1 left-[2rem]"
                                width="32" 
                                height="32" 
                                viewBox="0 0 48 48" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M26.8036 25.2924C27.3275 25.4671 27.8938 25.1839 28.0685 24.66C28.2431 24.136 27.96 23.5697 27.436 23.3951L26.8036 25.2924ZM21.3542 22.4219H20.3542C20.3542 22.8523 20.6296 23.2344 21.0379 23.3706L21.3542 22.4219ZM22.3542 14.3857C22.3542 13.8334 21.9064 13.3857 21.3542 13.3857C20.8019 13.3857 20.3542 13.8334 20.3542 14.3857H22.3542ZM27.436 23.3951L21.6704 21.4732L21.0379 23.3706L26.8036 25.2924L27.436 23.3951ZM22.3542 22.4219V14.3857H20.3542V22.4219H22.3542ZM35.7292 20.5C35.7292 28.4391 29.2933 34.875 21.3542 34.875V36.875C30.3978 36.875 37.7292 29.5437 37.7292 20.5H35.7292ZM21.3542 34.875C13.4151 34.875 6.97916 28.4391 6.97916 20.5H4.97916C4.97916 29.5437 12.3105 36.875 21.3542 36.875V34.875ZM6.97916 20.5C6.97916 12.5609 13.4151 6.125 21.3542 6.125V4.125C12.3105 4.125 4.97916 11.4563 4.97916 20.5H6.97916ZM21.3542 6.125C29.2933 6.125 35.7292 12.5609 35.7292 20.5H37.7292C37.7292 11.4563 30.3978 4.125 21.3542 4.125V6.125Z" 
                                    fill="black"
                                />
                            </svg>
                            <span className='text-lg font-bold text-[#1E1E1E] relative left-[2.5rem]'>ล่าสุด</span>
                        </li>
                        <li className='flex items-center p-2 w-full sm:w-[250px] rounded relative top-3 left-[3rem] hover:bg-[#f3f2f2] hover:shadow'>
                        <Link href="/Favorites" className='flex'>
                            <svg 
                                className='mr-5 relative top-1 left-[2rem]'
                                width="32" 
                                height="32" 
                                viewBox="0 0 48 48" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 2.83337L21.3775 11.7017L31.1667 13.1325L24.0833 20.0317L25.755 29.7784L17 25.1742L8.24501 29.7784L9.91668 20.0317L2.83334 13.1325L12.6225 11.7017L17 2.83337Z" 
                                stroke="#1E1E1E" 
                                strokeWidth="1.6" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                />
                            </svg>
                                <span className='text-lg text-[#1E1E1E] relative left-[2.5rem]'>รายการโปรด</span>
                        </Link>
                            
                        </li>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex-wrap relative min-h-screen bg-[#EBEBEB] rounded">
                <h1 className="absolute top-14 left-16 text-xl font-extrabold text-[#1E1E1E] w-full max-w-full">
                    ล่าสุด
                </h1>
                <div className="flex-row ">
                    <span className="absolute top-36 left-36 text-lg  text-[#1E1E1E] w-full max-w-full font-medium">ชื่อ</span>
                    <span className="absolute top-36 left-[30rem] text-lg  text-[#1E1E1E] w-full max-w-full font-medium">ชนิด</span>
                    <span className="absolute top-36 left-[42rem] text-lg  text-[#1E1E1E] w-full max-w-full font-medium">เปิด</span>
                    <svg 
                        className='absolute top-36 left-[5.25rem]'
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24"
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M15.0002 2.40002V6.00002C15.0002 6.66277 15.5374 7.20002 16.2002 7.20002H19.8002M18.0002 4.20002C17.4661 3.72217 16.9119 3.1554 16.562 2.7873C16.3292 2.54236 16.0076 2.40002 15.6696 2.40002H6.59991C5.27443 2.40002 4.19992 3.47453 4.19991 4.80001L4.19981 19.2C4.19981 20.5254 5.27432 21.6 6.5998 21.6L17.3998 21.6C18.7253 21.6 19.7998 20.5255 19.7999 19.2001L19.8002 6.47786C19.8002 6.17102 19.6831 5.87606 19.4702 5.65516C19.0764 5.24667 18.4188 4.57454 18.0002 4.20002Z" 
                            stroke="black" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"/>
                    </svg>
                    <svg 
                        className='absolute top-44 left-[4rem]'
                        width="880" 
                        height="2" 
                        viewBox="0 0 917 1" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_353_997" fill="white">
                        <path d="M0 0H917V1H0V0Z"/>
                        </mask>
                        <path d="M0 0H917V1H0V0Z" fill="#EBEBEB"/>
                        <path d="M917 0H0V2H917V0Z" fill="black" mask="url(#path-1-inside-1_353_997)"/>
                    </svg>
                </div>
                
            </div>
        </div>
        </div>
    );
};

export default Project;