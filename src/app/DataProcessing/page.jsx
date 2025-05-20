// app/page.js หรือ app/layout.js
"use client";
import Ribbon from "../components/Ribbon/page";
import TableViewer from "../TableViewer/page";
import { MainDataProvider } from "../MainDataContext/page";
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter();
  return (
    <div className="h-screen overflow-hidden">
      <MainDataProvider>
      <div className="flex justify-end text-lg text-gray-600 font-bold mr-4"><button onClick={() => router.push('/Create')} >✕</button></div>
      <Ribbon />
      <TableViewer />
    </MainDataProvider>
    </div>
    
  );
}
