import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconMessage,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function SinglePost(props) {
  return (
    <Link
      to={
        "/u/raihanhori/posts/13-years-ago-today-a-true-patriot-lost-his-life-rest-in-peace-big-guy"
      }
      className="shadow-lg flex flex-col cursor-pointer hover:bg-gray-100"
    >
      <div>
        <img
          src="https://source.unsplash.com/random"
          alt="card-image"
          className="w-full h-[350px] object-cover"
        />
      </div>
      <div className="py-5 px-5">
        <h3 className="text-gray-800 text-xl">
          13 years ago today, a true patriot lost his life. Rest in Peace big
          guy.
        </h3>
        <div>
          <span className="text-gray-700 text-sm">
            13 hours ago by Raihanhori
          </span>
        </div>
        <div>
          <span className="text-orange-700 text-sm">/r/worldnews</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <IconArrowBigUp className="text-orange-800 w-8 h-8 fill-orange-800" />
              <span>24.5k</span>
            </div>
            <IconArrowBigDown className="text-orange-800 w-8 h-8" />
          </div>
          <div className="flex items-center gap-x-2">
            <IconMessage className="text-orange-800 w-8 h-8 fill-orange-800" />
            <span>3k</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
