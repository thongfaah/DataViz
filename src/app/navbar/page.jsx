"use client"

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Container, Navbar, Form, Nav} from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';


const projects = [
    { id: 1, name: "Project1" },
    { id: 2, name: "Project2" },
    { id: 3, name: "Project3" },
  ];

function Nav1() {

  const router = useRouter();
  const {data : session} = useSession();
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

return (
    <Navbar expand="lg"  className="bg-white py-3 mb-2 lg:h-18 z-20">
            <Container className="flex justify-content-between align-items-center">
              <Navbar.Brand href="/Homepage" className="text-[#2B3A67] text-4xl font-bold px-3 mt-2">ClarityViz</Navbar.Brand>  
            
            <Nav className=" flex justify-center mx-auto px-3">
              <Form className="w-50 relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-5">
                  <path d ="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#2B3A67"/>
                </svg>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    style={{
                      width: "500px",
                      height: "37px",
                      padding: "15px",
                      marginTop: "10px",
                      borderRadius: "20px",
                      backgroundColor: "#F5F5F5",
                      paddingLeft: "35px",
                    }}
                    
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                />
                 {showDropdown && (
                  <ul className="absolute bg-white border rounded shadow-lg w-full mt-1 z-10">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <li
                          key={project.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(project.name);
                            setShowDropdown(false);
                          }}
                        >
                          {project.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No projects found.</li>
                    )}
                  </ul>
                )}
              </Form>
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
                  <div className="fixed  right-0 mt-3 w-56 bg-[#E3E3E3] shadow-lg rounded-lg p-3 z-50">
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

export default Nav1;