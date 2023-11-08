import { useState } from "react";
import AllPost from "../../components/Post/AllPost";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

export default function MyPost() {
  const [createPost, setCreatePost] = useState(false);
  const handleCreatePost = () => {
    setCreatePost(!createPost);
  };

  return (
    <div>
      <button
        onClick={handleCreatePost}
        className="inline-flex gap-x-3 items-center mb-5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-75"
      >
        Create Post
        {createPost ? <IconChevronUp /> : <IconChevronDown />}
      </button>
      <div className={`border mb-5 p-3 ${createPost ? "block" : "hidden"}`}>
        <form>
          <div className="mb-3">
            <label htmlFor="content" className="text-sm">
              Content*
            </label>
            <textarea
              name="content"
              id="content"
              className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="text-sm">
              Attachment
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full mt-1"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 bg-violet-600 hover:bg-violet-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition duration-75"
          >
            Post
          </button>
        </form>
      </div>
      <AllPost></AllPost>
    </div>
  );
}
