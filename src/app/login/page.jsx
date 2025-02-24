"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
//import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{

            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            // กรณีข้อมูลผิด
            if(res.error){
                setError("Login failed. Please check your email and password and try again.")

                // error ขึ้นมา 2 วินาที
                setTimeout(() => {
                    setError(""); // เคลียร์ข้อความ error
                }, 2000);

                return; 
            }

            router.replace("Homepage")

        } catch(error){
            console.log(error);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100" >
        
        <div className="flex max-w-[1000px] h-[500px] w-full rounded-md shadow-md">
            <div className="bg-white w-1/2 h-full p-6">
                <h2 className="text-2xl font-bold leading-relaxed" >  Hello! We&apos;re excited to have you here.</h2>
                <h2 className="text-2xl font-bold leading-relaxed" style={{ marginBottom: "30px" }}>  Sign in and let&apos;s get started!</h2>
                
                <div>
                    <form onSubmit={handleSubmit}>
                        
                        
                        {/* แสดง error ของ toast */}
                        <div> 
                            <ToastContainer />
                        </div>


                        <label htmlFor="email" className="font-medium text-lg" >Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='block bg-zinc-200 p-1 rounded-sm my-2 w-full' type="email" id="email" name="email" placeholder='Enter email' style={{ marginBottom: "30px" }} required />
                        <label htmlFor="password" className="font-medium text-lg" >Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='block bg-zinc-200 p-1 rounded-sm my-2 w-full' type="password" id="password" name="password" placeholder='Enter password' required />
                        <button type = 'submit' className='bg-[#2B3A67]  p-2 rounded-md text-white  w-[150px]' style={{ marginTop: "30px" }}>Submit</button>
                        <p style={{ marginTop: "30px" }}>If you don&apos;t have an account yet, <Link className='text-blue-500 hover:underline' href="/register">click here</Link> to create one.</p>
                    </form>
                </div>
            </div>
            <div className="bg-[#2B3A67] w-1/2 flex items-center justify-center h-full">
                <img 
                    src="/icon_graph.png" alt="Graph" style={{ width: '400px', height: 'auto' }} 
                    className="max-w-full max-h-full object-contain ml-20"
                />
            </div>   
        </div>   

    </div> 
   
  )
}

export default Login
