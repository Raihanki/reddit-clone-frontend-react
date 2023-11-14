import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import AllPost from "../../components/Post/AllPost";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiRequest from "../../api/RequestConfig";
import Loading from "../../components/Loading";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";

export default function DetailSubreddit() {
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState(false);
  const { authenticatedUser } = useAuth();
  const handleCreatePost = () => {
    setCreatePost(!createPost);
  };
  const params = useParams();
  const query = useQuery({
    queryKey: ["subreddit", params.subreddit],
    queryFn: () => ApiRequest.get(`/subreddits/${params.subreddit}`),
  });

  const handleDelete = async () => {
    try {
      await ApiRequest.delete(`/subreddits/${params.subreddit}`);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/u/subreddits");
    }
  };

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const createPostMutation = useMutation({
    mutationFn: (post) => ApiRequest.post(`/posts/${params.subreddit}`, post),
    onSuccess: (data) => {
      navigate(`/r/${params.subreddit}/${data.data.data.slug}`);
      setData({
        title: "",
        content: "",
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmitPost = (e) => {
    e.preventDefault();
    createPostMutation.mutate(data);
  };

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
          {subreddit.avatar !== null ? (
            <img
              src={subreddit.avatar}
              alt="subreddit-avatar"
              className="w-64 h-64 object-cover rounded-full"
            />
          ) : (
            <img
              src="https://source.unsplash.com/random"
              alt="subreddit-avatar"
              className="w-64 h-64 object-cover rounded-full"
            />
          )}
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
            {subreddit.createdBy === authenticatedUser?.username && (
              <div>
                <Link
                  to={`/r/update/${subreddit.slug}`}
                  className="px-3 py-2 bg-pink-600 hover:bg-pink-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-75"
                >
                  Update
                </Link>
              </div>
            )}
            <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75">
              Subscribe
            </button>
            {subreddit.createdBy === authenticatedUser?.username && (
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-75"
              >
                Delete
              </button>
            )}
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
          <form onSubmit={handleSubmitPost}>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="title" className="text-sm">
                  Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>
              <label htmlFor="content" className="text-sm">
                Content*
              </label>
              <textarea
                name="content"
                id="content"
                onChange={handleChange}
                value={data.content}
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
              disabled={createPost.isPending}
              className={`${
                createPostMutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-75`}
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
