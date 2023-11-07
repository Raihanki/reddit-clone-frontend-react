import { Link } from "react-router-dom";

export default function MySubscribed() {
  return (
    <>
      <div className="border p-5 mt-5">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b pb-5">
            <div className="flex gap-x-5 items-center">
              <div>
                <img
                  src="https://source.unsplash.com/random"
                  alt="subreddit-image"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div>
                <div>
                  <Link
                    to={"/r/laravel"}
                    className="text-2xl font-medium text-slate-800 hover:text-orange-700 cursor-pointer"
                  >
                    Laravel
                  </Link>
                </div>
                <span className="text-slate-500 text-sm">
                  Subreddit created by. raihanhori at 09 October 2003
                </span>
              </div>
            </div>
            <div>
              <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75">
                Unsubscribe
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-5 border-b pb-5">
            <div className="flex gap-x-5 items-center">
              <div>
                <img
                  src="https://source.unsplash.com/random"
                  alt="subreddit-image"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div>
                <div>
                  <Link
                    to={"/r/laravel"}
                    className="text-2xl font-medium text-slate-800 hover:text-orange-700 cursor-pointer"
                  >
                    Node JS
                  </Link>
                </div>
                <span className="text-slate-500 text-sm">
                  Subreddit created by. bruhmoment at 20 March 2001
                </span>
              </div>
            </div>
            <div>
              <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75">
                Unsubscibe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
