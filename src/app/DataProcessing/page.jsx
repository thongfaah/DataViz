// app/page.js หรือ app/layout.js
import Ribbon from "../components/Ribbon/page";

export default function Page() {
  return (
    <>
      <Ribbon />
      <main className="p-4">
        {/* เนื้อหาเว็บไซต์ */}
      </main>
    </>
  );
}
