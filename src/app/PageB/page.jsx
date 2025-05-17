// app/test2/page.jsx
'use client';
import { useSearchParams } from 'next/navigation';

export default function Test2() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Test2 Page</h1>
      <p>ค่าที่ได้รับ: <strong>{message}</strong></p>
    </div>
  );
}
