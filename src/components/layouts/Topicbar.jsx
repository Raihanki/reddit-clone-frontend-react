import { Link, useLocation } from "react-router-dom";

export default function Topicbar() {
  const location = useLocation();
  return (
    <div className="flex items-center bg-gray-100 px-7 py-3 gap-x-5 md:gap-x-10">
      <Link to={"/"} className="cursor-pointer">
        <span
          className={`uppercase tracking-wide ${
            location.pathname === "/" ? "text-rose-800" : "text-gray-800"
          } hover:text-rose-900 text-sm`}
        >
          Hot Posts
        </span>
      </Link>
      <Link to={"/r"} className="cursor-pointer">
        <span
          className={`uppercase tracking-wide ${
            location.pathname === "/r" ? "text-rose-800" : "text-gray-800"
          } hover:text-rose-900 text-sm`}
        >
          Subreddits
        </span>
      </Link>
    </div>
  );
}
