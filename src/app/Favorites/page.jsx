"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/page'
import Nav1 from '../navbar/page';
import Link from 'next/link'

const Favorites = () => {
    
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
                    <ul className="w-full">
                        <li className='flex items-center rounded p-2 w-full sm:w-[250px] relative left-[3rem] hover:bg-[#f3f2f2] hover:shadow '>
                        <Link href="/Project" className='flex'>
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
                                <span className='text-lg text-[#1E1E1E] relative left-[2.5rem]'>ล่าสุด</span>
                        </Link> 
                        </li>
                        <li className='flex items-center p-2 w-full sm:w-[250px] bg-[#D9D9D9] rounded relative top-3 left-[3rem] '>
                        <svg 
                            className='mr-5 relative mt-[-5px] left-[2rem]'
                            width="32" 
                            height="32" 
                            viewBox="0 0 48 48" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 36.2295L18.8325 41.1615C18.5925 41.28 18.3698 41.328 18.1643 41.3055C17.9603 41.2815 17.7615 41.211 17.568 41.094C17.373 40.974 17.226 40.8045 17.127 40.5855C17.028 40.3665 17.019 40.1272 17.1 39.8677L19.2735 30.6202L12.0848 24.3877C11.8823 24.2227 11.7488 24.0255 11.6843 23.796C11.6198 23.5665 11.634 23.3467 11.727 23.1367C11.82 22.9267 11.9438 22.7542 12.0983 22.6192C12.2543 22.4887 12.4643 22.4002 12.7283 22.3537L22.2143 21.5257L25.9133 12.7687C26.0153 12.5212 26.1623 12.3427 26.3543 12.2332C26.5463 12.1237 26.7615 12.069 27 12.069C27.2385 12.069 27.4545 12.1237 27.648 12.2332C27.8415 12.3427 27.9878 12.5212 28.0868 12.7687L31.7858 21.5257L41.2695 22.3537C41.535 22.3987 41.7458 22.488 41.9018 22.6215C42.0578 22.7535 42.1823 22.9252 42.2753 23.1367C42.3668 23.3467 42.3803 23.5665 42.3158 23.796C42.2513 24.0255 42.1178 24.2227 41.9153 24.3877L34.7265 30.6202L36.9 39.8677C36.984 40.1242 36.9758 40.3627 36.8753 40.5832C36.7748 40.8037 36.627 40.9732 36.432 41.0917C36.24 41.2117 36.0413 41.283 35.8358 41.3055C35.6318 41.328 35.4098 41.28 35.1698 41.1615L27 36.2295Z" 
                            fill="black"
                            />
                        </svg>
                        <span className='text-lg font-bold text-[#1E1E1E] relative left-[2.5rem]'>รายการโปรด</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 flex-wrap relative min-h-screen bg-[#EBEBEB] rounded">
                <h1 className="absolute top-14 left-16 text-xl font-extrabold text-[#1E1E1E] w-full max-w-full">
                    รายการโปรดของคุณ
                </h1>
                
                
            </div>
        </div>
        </div>
    );
};

export default Favorites;