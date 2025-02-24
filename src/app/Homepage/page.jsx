"use client"

import React from 'react';
import Sidebar from "../Sidebar/page";
// import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Nav1 from '../navbar/page';

function Homepage() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Nav1 />
      
      <div className="bg-[#F5F5F5] h-screen">
        <Sidebar />

        {/* Main Content */}
        <main className="px-20 py-8">
          <h1 className="ml-20 mb-6 p-5 text-2xl font-semibold text-[#2B3A67]">My file</h1>
          <div className=" flex grid grid-cols-3 gap-2 px-20 ">

          {/* File Boxes */}
          {/* <div className="w-90 h-60 bg-white border border-gray-300 "></div>
          <div className="w-90 h-60 bg-white border border-gray-300 "></div> */}
       

          {/* Add Button */}
          <Link 
            href={"/Create"}
            className="flex items-center justify-item-center w-60 h-60 p-20  cursor-pointer hover:bg-gray-200">
            <svg width="90" height="60" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M41 2.5V79.5M2.5 41H79.5" stroke="#2B3A67" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> 
          </Link> 
          </div>
        </main>
      </div>
    </div>
    

  )
}

export default Homepage;