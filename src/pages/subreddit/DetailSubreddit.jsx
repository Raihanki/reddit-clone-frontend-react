import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import AllPost from "../../components/Post/AllPost";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApiRequest from "../../api/RequestConfig";
import Loading from "../../components/Loading";
import moment from "moment";

export default function DetailSubreddit() {
  const [createPost, setCreatePost] = useState(false);
  const handleCreatePost = () => {
    setCreatePost(!createPost);
  };
  const params = useParams();
  const query = useQuery({
    queryKey: ["subreddit", params.subreddit],
    queryFn: () => ApiRequest.get(`/subreddits/${params.subreddit}`),
  });

  if (query.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (query.isError) return <div>Something Went Wrong</div>;

  const subreddit = query.data?.data?.data;
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-x-5 gap-y-5 border-b pb-10">
        <div className="w-full md:w-1/3 flex md:block justify-center">
          <img
            src="https://source.unsplash.com/random"
            alt="subreddit-picture"
            className="w-64 h-64 object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl">{subreddit.name}</h1>
          <div>
            <span className="text-gray-500 text-sm">
              Created by {subreddit.createdBy} at{" "}
              {moment(subreddit.createdAt).format("DD MMMM YYYY")}
            </span>
          </div>
          <div className="my-4">
            <p className="leading-relaxed">{subreddit.description}</p>
          </div>
          <div className="flex flex-row gap-x-5 items-center">
            <div>
              <Link
                to={"/r/update/laravel"}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 transition duration-75"
              >
                Update
              </Link>
            </div>
            <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-medium mb-8 text-center">All Posts</h3>
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
        <AllPost subreddit={subreddit.slug}></AllPost>
      </div>
    </div>
  );
}
