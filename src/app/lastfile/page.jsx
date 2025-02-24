"use client"
import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/page'
import Nav1 from '../navbar/page';
import Link from 'next/link'

function lastFile () {

    return (

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
    );
        
}

export default lastFile;