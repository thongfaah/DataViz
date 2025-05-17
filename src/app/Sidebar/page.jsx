
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(null); 
  
  // กำหนด active ตาม path แทน localStorage
  useEffect(() => {
    switch (pathname) {
      case "/Homepage":
        setActiveButton(0);
        break;
      case "/Create":
        setActiveButton(1);
        break;
      case "/Project":
        setActiveButton(2);
        break;
      case "/Dashboard":
        setActiveButton(3);
        break;
      default:
        setActiveButton(null);
    }
  }, [pathname]);

  return (
    <div className="flex">
      <div className="flex flex-col space-y-0 fixed top-[5rem] left-0 h-[calc(100vh-4rem)] bg-white text-[#2B3A67] w-[5.5rem] z-40">

        {/* Homepage */}
        <Link href="/Homepage">
          <button
            className={`flex flex-col items-center justify-center w-full h-20 text-xs ${
              activeButton === 0 ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current"
            >
              <path
                d="M18 42V28.3057C18 27.0451 19.0745 26.0233 20.4 26.0233H27.6C28.9255 26.0233 30 27.0451 30 28.3057V42M22.6091 6.42234L7.00914 16.9721C6.37603 17.4002 6 18.0933 6 18.8321V38.5764C6 40.4672 7.61178 42 9.6 42H38.4C40.3882 42 42 40.4672 42 38.5764V18.8321C42 18.0933 41.624 17.4002 40.9909 16.9721L25.3909 6.42234C24.5582 5.85922 23.4418 5.85922 22.6091 6.42234Z"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
    
            Homepage
          </button>
        </Link>

        {/* Create */}
        <Link href="/Create">
          <button
            className={`flex flex-col items-center justify-center w-full h-20 text-xs ${
              activeButton === 1 ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current"
            >
              <path
                d="M21.5 14.3334V28.6667M14.3334 21.5H28.6667M39.4167 21.5C39.4167 31.3951 31.3951 39.4167 21.5 39.4167C11.6049 39.4167 3.58337 31.3951 3.58337 21.5C3.58337 11.6049 11.6049 3.58337 21.5 3.58337C31.3951 3.58337 39.4167 11.6049 39.4167 21.5Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Create
          </button>
        </Link>

        {/* Project */}
        <Link href="/Project">
          <button
            className={`flex flex-col items-center justify-center w-full h-20 text-xs ${
              activeButton === 2 ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current"
            >
              <path
                d="M4.50193 15.7813L4.50174 35.3894C4.50172 36.494 5.39716 37.3894 6.50173 37.3894L38.4993 37.3895C39.6039 37.3895 40.4993 36.4941 40.4993 35.3896L40.5 14.1483C40.5 13.596 40.0523 13.1483 39.5 13.1483H22.6569L17.4725 7.61023H5.50038C4.94794 7.61023 4.50017 8.05614 4.50035 8.60857C4.50091 10.2634 4.50194 13.6074 4.50193 15.7813Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Project
          </button>
        </Link>

        {/* Dashboard */}
        <Link href="/Dashboard">
          <button
            className={`flex flex-col items-center justify-center w-full h-20 text-xs ${
              activeButton === 3 ? "bg-[#2B3A67] text-white" : "bg-white text-[#2B3A67]"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current ml-1"
            >
              <g clipPath="url(#clip0_240_1020)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.28571 0C1.02335 0 0 1.02335 0 2.28571V16C0 17.2624 1.02335 18.2857 2.28571 18.2857H11.4286C12.6909 18.2857 13.7143 17.2624 13.7143 16V2.28571C13.7143 1.02335 12.6909 0 11.4286 0H2.28571ZM18.2857 2.28571C18.2857 1.02335 19.3091 0 20.5714 0H29.7143C30.9767 0 32 1.02335 32 2.28571V6.88C32 8.14235 30.9767 9.16572 29.7143 9.16572H20.5714C19.3091 9.16572 18.2857 8.14235 18.2857 6.88V2.28571ZM18.2857 16C18.2857 14.7376 19.3091 13.7143 20.5714 13.7143H29.7143C30.9767 13.7143 32 14.7376 32 16V29.7143C32 30.9767 30.9767 32 29.7143 32H20.5714C19.3091 32 18.2857 30.9767 18.2857 29.7143V16ZM0 25.12C0 23.8576 1.02335 22.8343 2.28571 22.8343H11.4286C12.6909 22.8343 13.7143 23.8576 13.7143 25.12V29.7143C13.7143 30.9767 12.6909 32 11.4286 32H2.28571C1.02335 32 0 30.9767 0 29.7143V25.12Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_240_1020">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
