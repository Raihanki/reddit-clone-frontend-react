import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Topicbar from "./Topicbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex w-full min-h-full">
      <div className="hidden lg:block w-1/5 min-h-screen border-r">
        <Sidebar></Sidebar>
      </div>
      <div className="w-full lg:w-4/5">
        <Topbar></Topbar>
        <Topicbar></Topicbar>
        <main className="px-7 py-12">{children}</main>
      </div>
    </div>
  );
}
