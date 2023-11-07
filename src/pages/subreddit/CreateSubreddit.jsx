import { IconCameraPlus } from "@tabler/icons-react";

export default function CreateSubreddit() {
  return (
    <div>
      <form className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-x-5 gap-y-5 border-b pb-10">
        <div className="w-full md:w-1/3 flex md:block justify-center">
          <div className="w-64 h-64 object-cover rounded-full border border-gray-500 flex items-center justify-center">
            <IconCameraPlus className="w-20 h-20 opacity-50" />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-2 py-4 focus:outline-none md:w-1/2 text-gray-800 placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold bg-transparent border-t-0 border-l-0 border-r-0 border-grey-200 text-lg focus:ring-0 border-b"
              placeholder="Subreddit Name"
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Subreddit Description"
              name="description"
              id="description"
              className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="country"
              id="country"
              className="w-full px-2 py-4 focus:outline-none md:w-1/2 text-gray-800 placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold bg-transparent border-t-0 border-l-0 border-r-0 border-grey-200 text-lg focus:ring-0 border-b"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="topic" className="text-sm text-grat-800">
              Topic
            </label>
            <select
              name="topic"
              id="topic"
              className="w-full px-3 py-2 bg-transparent border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <option disabled selected>
                Select Subreddit Topic
              </option>
              <option value="technologies">Technologies</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="allowPost"
              id="allowPost"
              className="mr-2 cursor-pointer w-4 h-4"
            />
            <label htmlFor="allowPost" className="text-sm">
              Allow Post
            </label>
          </div>
          <div className="flex flex-row gap-x-5 items-center">
            <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
