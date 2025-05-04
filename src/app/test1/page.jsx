// app/test1/page.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function Test1() {
  const router = useRouter();

  const handleClick = (value) => {
    router.push(`/test2?message=${value}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Test1 Page</h1>
      <button
        onClick={() => handleClick('123')}
        className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
      >
        ปุ่ม A
      </button>
      <button
        onClick={() => handleClick('456')}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        ปุ่ม B
      </button>
    </div>
  );
}
