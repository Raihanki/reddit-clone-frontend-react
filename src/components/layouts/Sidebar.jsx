import {
  IconChevronDown,
  IconChevronUp,
  IconFile,
  IconHome,
  IconLayoutDashboard,
  IconNotification,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Sidebar() {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownClicked = () => {
    setDropdown(!dropdown);
  };
  return (
    <aside className="w-full px-3 pt-[6.5rem]">
      <div className="px-2 py-5 lg:px-4">
        <div className="border-b mb-5 pb-3">
          <h3 className="text-3xl font-semibold mb-10 text-rose-800">
            Reddit Clone
          </h3>
          <div
            className="flex justify-between cursor-pointer hover:text-orange-900"
            onClick={handleDropdownClicked}
          >
            <h5>Raihanhori</h5>
            {dropdown ? <IconChevronUp /> : <IconChevronDown />}
          </div>
          <div
            className={`bg-gray-100 ${
              dropdown ? "flex flex-col gap-y-4 px-2 py-3 mt-3" : "hidden"
            }`}
          >
            <div className="cursor-pointer hover:text-orange-800">Profile</div>
            <div className="cursor-pointer hover:text-orange-800">Logout</div>
          </div>
        </div>
        <input
          type="text"
          className="px-2 py-2 flex w-full border border-gray-300 shadow-sm text-gray-700"
          placeholder="Search Reddit"
        />
        <ul className="space-y-6 mt-5">
          <li>
            <div className="flex items-center gap-x-5 cursor-pointer text-rose-700 font-semibold">
              <IconHome />
              <div>Home</div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-5">
              <IconNotification />
              <div>Notification</div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-5">
              <IconFile />
              <div>My Posts</div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-5">
              <IconLayoutDashboard />
              <div>My Subreddits</div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
