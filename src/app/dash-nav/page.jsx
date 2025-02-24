"use client"

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Container, Navbar, Form, Nav} from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';



function DashNav() {

  const router = useRouter();
  const [name, setName] = useState("");
  const {data : session} = useSession();
  const [open, setOpen] = useState(false);

return (

    <Navbar expand="lg"  className="bg-white py-3 mb-2 lg:h-18">
            <Container className="flex justify-content-between align-items-center">
              <Navbar.Brand href="/Homepage" className="text-[#2B3A67] text-4xl font-bold px-3 mt-2">ClarityViz</Navbar.Brand>  
            
            <Nav className=" flex justify-center mx-auto px-3 ms-3">
            <input
                id="name"
                type="text"
                placeholder="Report name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-30 p-2 h-10 mt-3 rounded-lg focus:outline-none focus:ring-2 text-gray-900"
            />
              </Nav>

             {/* Profile Section */}
            <Nav className="flex px-3 mt-2 relative">

              {/* Dropdown Container */}
              <div className="relative">
                
                {/* Toggle Button */}
                <button
                  className="bg-transparent border-none flex items-center justify-center focus:outline-none"
                  onClick={() => setOpen(!open)}
                >
                  <svg width="40" height="40" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.7749 57.2C13.2929 55.4999 20.4025 47.6761 22.486 47.6761H44.5152C47.5343 47.6761 53.6975 54.1614 
                      55.2249 56.4475M65.0999 33.5C65.0999 50.9522 50.9521 65.1 33.4999 65.1C16.0477 65.1 1.8999 50.9522 1.8999 33.5C1.8999 
                      16.0478 16.0477 1.89999 33.4999 1.89999C50.9521 1.89999 65.0999 16.0478 65.0999 33.5ZM44.8194 22.7295C44.8194 16.7008 39.73 
                      11.775 33.5008 11.775C27.2718 11.775 22.1823 16.7008 22.1823 22.7295C22.1823 28.7582 27.2718 33.6841 33.5008 33.6841C39.7299 
                      33.6841 44.8194 28.7582 44.8194 22.7295Z"
                      stroke="#2B3A67"
                      strokeWidth="2"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#E3E3E3] shadow-lg rounded-lg p-3">
                    <h3 className="text-sm font-semibold text-black mb-2">Profile</h3>

                    <div className="flex items-center gap-3 mb-4">
                      <svg width="40" height="40" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.7749 57.2C13.2929 55.4999 20.4025 47.6761 22.486 47.6761H44.5152C47.5343 47.6761 53.6975 54.1614 
                          55.2249 56.4475M65.0999 33.5C65.0999 50.9522 50.9521 65.1 33.4999 65.1C16.0477 65.1 1.8999 50.9522 1.8999 33.5C1.8999 
                          16.0478 16.0477 1.89999 33.4999 1.89999C50.9521 1.89999 65.0999 16.0478 65.0999 33.5ZM44.8194 22.7295C44.8194 16.7008 39.73 
                          11.775 33.5008 11.775C27.2718 11.775 22.1823 16.7008 22.1823 22.7295C22.1823 28.7582 27.2718 33.6841 33.5008 33.6841C39.7299 
                          33.6841 44.8194 28.7582 44.8194 22.7295Z"
                          stroke="#1E1E1E"
                          strokeWidth="2"
                        />
                      </svg>

                      <div>
                        <p className="text-sm font-medium text-black">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                      </div>
                    </div>

                    <hr className="my-2 border-black" />

                    <button
                      className="w-full text-left text-sm text-black hover:text-gray-900"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </Nav>
  
            </Container>
          </Navbar>
       );
}

export default DashNav;