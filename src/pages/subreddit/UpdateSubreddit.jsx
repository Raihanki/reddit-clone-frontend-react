import { IconCameraPlus } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequest from "../../api/RequestConfig";
import Loading from "../../components/Loading";
import { useState } from "react";

export default function UpdateSubreddit() {
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["subreddit", params.subreddit],
    queryFn: () => ApiRequest.get(`/subreddits/${params.subreddit}`),
  });

  const queryTopic = useQuery({
    queryKey: ["topics"],
    queryFn: () => ApiRequest.get(`/topics`),
  });

  const [subreddit, setSubreddit] = useState({
    name: query.data?.data?.data?.name,
    description: query.data?.data?.data?.description,
    country: query.data?.data?.data?.country,
    topicId: query.data?.data?.data?.topicId,
    allowPost: query.data?.data?.data?.allowPost,
  });

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setSubreddit({ ...subreddit, [e.target.name]: e.target.checked });
    } else {
      setSubreddit({ ...subreddit, [e.target.name]: e.target.value });
    }
  };

  const updateSubredditMutation = useMutation({
    mutationFn: (subreddit) => {
      ApiRequest.put(`/subreddits/${params.subreddit}`, subreddit);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["subreddit", params.subreddit],
        exact: true,
      });
      navigate(`/u/subreddits`);
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubredditMutation.mutate(subreddit);
  };

  if (query.isLoading || queryTopic.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (query.isError || queryTopic.isError)
    return <div>Something Went Wrong</div>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-x-5 gap-y-5 border-b pb-10"
      >
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
              onChange={handleChange}
              value={subreddit.name}
              className="w-full px-2 py-4 focus:outline-none md:w-1/2 text-gray-800 placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold bg-transparent border-t-0 border-l-0 border-r-0 border-grey-200 text-lg focus:ring-0 border-b"
              placeholder="Subreddit Name"
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Subreddit Description"
              name="description"
              id="description"
              onChange={handleChange}
              value={subreddit.description}
              className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="country"
              id="country"
              onChange={handleChange}
              value={subreddit.country}
              className="w-full px-2 py-4 focus:outline-none md:w-1/2 text-gray-800 placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold bg-transparent border-t-0 border-l-0 border-r-0 border-grey-200 text-lg focus:ring-0 border-b"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="topic" className="text-sm text-grat-800">
              Topic
            </label>
            <select
              name="topicId"
              id="topic"
              onChange={handleChange}
              value={subreddit.topicId}
              className="w-full px-3 py-2 bg-transparent border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <option disabled>Select Subreddit Topic</option>
              {queryTopic.data?.data?.data?.map((topic) => (
                <option
                  key={topic.id}
                  value={topic.id}
                  selected={topic.id == subreddit.topicId}
                >
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="allowPost"
              id="allowPost"
              onChange={handleChange}
              checked={subreddit.allowPost}
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
