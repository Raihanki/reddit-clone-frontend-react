import { IconFileStar, IconUserPlus } from "@tabler/icons-react";
import {
  IconChevronDown,
  IconChevronUp,
  IconFile,
  IconHome,
  IconLayoutDashboard,
  IconLogin2,
  IconNotification,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import ApiRequest from "../../api/RequestConfig";

export default function Sidebar() {
  const [dropdown, setDropdown] = useState(false);
  const { authenticatedUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDropdownClicked = () => {
    setDropdown(!dropdown);
  };

  const logoutMutation = useMutation({
    mutationFn: () => {
      ApiRequest.post("/auth/logout");
    },
    onSuccess: (data) => {
      navigate("/");
      logout();
    },
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <aside className="w-full px-3 pt-[6.5rem]">
      <div className="px-2 py-5 lg:px-4">
        <div className="border-b mb-5 pb-3">
          <h3 className="text-3xl font-semibold mb-10 text-rose-800">
            Reddit Clone
          </h3>
          {authenticatedUser && (
            <>
              <div
                className="flex justify-between cursor-pointer hover:text-orange-900"
                onClick={handleDropdownClicked}
              >
                <h5>{authenticatedUser?.username}</h5>
                {dropdown ? <IconChevronUp /> : <IconChevronDown />}
              </div>
              <div
                className={`bg-gray-100 ${
                  dropdown ? "flex flex-col gap-y-4 px-2 py-3 mt-3" : "hidden"
                }`}
              >
                <div className="cursor-pointer hover:text-orange-800">
                  Profile
                </div>
                <div
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-orange-800"
                >
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
        <input
          type="text"
          className="px-2 py-2 flex w-full border border-gray-300 shadow-sm text-gray-700"
          placeholder="Search Reddit"
        />
        <ul className="space-y-6 mt-5">
          <li>
            <Link
              to={"/"}
              className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                location.pathname === "/" ? "text-rose-700 font-semibold" : ""
              }`}
            >
              <IconHome />
              <div>Home</div>
            </Link>
          </li>
          {!authenticatedUser && (
            <>
              <li>
                <Link
                  to={"/login"}
                  className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                    location.pathname === "/login"
                      ? "text-rose-700 font-semibold"
                      : ""
                  }`}
                >
                  <IconLogin2 />
                  <div>Login</div>
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                    location.pathname === "/register"
                      ? "text-rose-700 font-semibold"
                      : ""
                  }`}
                >
                  <IconUserPlus />
                  <div>Register</div>
                </Link>
              </li>
            </>
          )}
          {authenticatedUser && (
            <>
              <li>
                <div className="flex items-center gap-x-5 hover:cursor-pointer hover:text-rose-700 hover:font-semibold">
                  <IconNotification />
                  <div>Notification</div>
                </div>
              </li>
              <li>
                <Link
                  to={"/u/posts"}
                  className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                    location.pathname === "/u/posts"
                      ? "text-rose-700 font-semibold"
                      : ""
                  }`}
                >
                  <IconFile />
                  <div>MyPost</div>
                </Link>
              </li>
              <li>
                <Link
                  to={"/u/subreddits"}
                  className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                    location.pathname === "/u/subreddits"
                      ? "text-rose-700 font-semibold"
                      : ""
                  }`}
                >
                  <IconLayoutDashboard />
                  <div>My Subreddits</div>
                </Link>
              </li>
              <li>
                <Link
                  to={"/u/subscribed"}
                  className={`flex items-center gap-x-5 cursor-pointer hover:cursor-pointer hover:text-rose-700 hover:font-semibold ${
                    location.pathname === "/u/subscribed"
                      ? "text-rose-700 font-semibold"
                      : ""
                  }`}
                >
                  <IconFileStar />
                  <div>Subscibed</div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}
