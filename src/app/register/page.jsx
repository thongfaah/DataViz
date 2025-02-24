"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [error, setError] = useState("");
    //   const [success, setSuccess] = useState("");
      
    const router = useRouter();

    const showErrorToast = (message) => {
            toast.error(message, {
                position: "top-center",  // ตำแหน่งการแสดง
                autoClose: 5000,         // แสดงข้อความ 5 วินาที
                hideProgressBar: true,   // ซ่อนแถบโปรเกรส
                closeOnClick: true,      // คลิกเพื่อปิด
                pauseOnHover: true,      // หยุดเมื่อเมาส์อยู่บน Toast
                draggable: false,         // สามารถลากได้
                progress: undefined,
            });
        };
    
        useEffect(() => {
            if (error) {
                showErrorToast(error);
            }
        }, [error]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword){
          setError("Password do not match")

           // error ขึ้นมา 2 วินาที
        //    setTimeout(() => {
        //     setError(""); // เคลียร์ข้อความ error
        // }, 2000);

          return;
        }

        if ( !name || !email || !password || !confirmPassword){
          setError("Please complete all inputs")
          return;
        }

        try{

            const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })

            const {user} = await resCheckUser.json();

            if (user){
                setError("User already exists!, Please use a different email address.")

                 // error ขึ้นมา 2 วินาที
                 setTimeout(() => {
                  setError(""); // เคลียร์ข้อความ error
              }, 2000);

                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name, email, password
                })
            })

            if (res.ok) {

            const form = e.target;
            setError("");
            
            form.reset();
            router.replace("/login")
            
          } else{
            
            console.log("User registration failed.");
            
          }
          
          
        } catch(error) {
          console.log("Error during registration.", error);
          form.reset();
        }

      }

    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100">
        <div className="bg-white w-full max-w-[800px] h-[600px] p-6 rounded-md shadow-md">
          <h1 className="text-5xl font-bold text-center mb-6 text-[#2B3A67]">Register</h1>

          <form onSubmit = {handleSubmit}> 
             

            {/* แสดง error ของ toast */}
            <div> <ToastContainer /> </div>
                        
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input onChange={(e) => setName(e.target.value)}
                type="name"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
                style={{ marginTop: '10px' }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
                style={{ marginTop: '10px' }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} 
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
                style={{ marginTop: '10px' }}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-lg font-medium" >Confirm Password</label>
              <input onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirm-password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Confirm your password"
                required
                style={{ marginTop: '10px' }}
              />
            </div>

            <div className="flex items-center justify-center">
            <button type="submit" className="w-1/3 max-w-sm bg-[#2B3A67] text-white py-2 rounded-md font-medium text-center">Enter</button>
            </div>
            <p style={{ marginTop: '30px' }}>Already have an account?{' '}
                <Link className="text-blue-500 hover:underline" href="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;