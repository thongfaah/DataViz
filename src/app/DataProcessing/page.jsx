// app/page.js หรือ app/layout.js
import Ribbon from "../components/Ribbon/page";
import TableViewer from "../TableViewer/page";
import { MainDataProvider } from "../MainDataContext/page";
export default function Page() {
  return (
    <MainDataProvider>
      <Ribbon />
      <TableViewer />
    </MainDataProvider>
  );
}
