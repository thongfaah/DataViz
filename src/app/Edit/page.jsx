"use client"

import React, { useState } from 'react'
import { FaHome, FaFolder, FaColumns, FaPlus, FaFilter, FaTable, FaFileAlt, FaDatabase } from "react-icons/fa";
import Sidebar from "../Sidebar/page";
import DashNav from '../dash-nav/page';
import { Container, Navbar, Form, Nav} from 'react-bootstrap';
import Dashboard from '../Dashboard/page';

function DashEdit() {

    return (

       <div className='fixed top-0 left-0 w-full '>
            <Dashboard />

            <div className="flex-1 flex flex-col ">
                <div className="relative flex bg-[#F5F5F5] top-[7.3rem] ml-[5.5rem] h-[2.5rem] z-0">
                <button className="flex items-center space-x-1 p-2 bg-[#F5F5F5]  px-3">
                    <FaFileAlt />
                    <span>File</span>
                </button>
                <button className="flex items-center space-x-1 p-2 bg-[#F5F5F5]  px-3">
                    <FaDatabase />
                    <span>Add Data</span>
                </button>
                <button className="flex items-center space-x-1 p-2 bg-[#F5F5F5]  px-3">
                    <FaTable />
                    <span>New Table</span>
                </button>
                <button className="p-2 bg-[#F5F5F5] rounded px-3">Text</button>
                <button className="flex items-center space-x-1 p-2 bg-[#F5F5F5]  px-3">
                    <FaFilter />
                    <span>Filter</span>
                </button>
                <button className="p-2 bg-[#F5F5F5]  px-3">Transform Data</button>
                </div>

            </div>
        

            
        </div>
    );
}

export default  DashEdit;