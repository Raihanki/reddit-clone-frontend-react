import { IconCamera, IconCameraPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ApiRequest from "../../api/RequestConfig";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export default function CreateSubreddit() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    country: "",
    topicId: "",
    allowPost: true,
    avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const queryGetTopic = useQuery({
    queryKey: ["getTopic"],
    queryFn: () => ApiRequest.get("/topics"),
  });

  const createSubredditMutation = useMutation({
    mutationFn: (subreddit) => ApiRequest.post("/subreddits", subreddit),
    onSuccess: (data) => {
      navigate("/u/subreddits");
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("avatar", data.avatar);
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("country", data.country);
    formdata.append("topicId", data.topicId);
    formdata.append("allowPost", data.allowPost);
    createSubredditMutation.mutate(formdata);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setData({ ...data, avatar: acceptedFiles[0] });
    },
  });

  if (queryGetTopic.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (queryGetTopic.isError) return <div>Something Went Wrong</div>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-x-5 gap-y-5 border-b pb-10"
      >
        <div className="w-full md:w-1/3 flex md:block justify-center">
          <div
            className="w-64 h-64 object-cover rounded-full border border-gray-500 flex items-center justify-center cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="uppercase font-bold text-lg">Drop Image Here...</p>
            ) : data.avatar === null ? (
              <>
                <IconCamera className="w-20 h-20"></IconCamera>
              </>
            ) : (
              <>
                <img
                  src={URL.createObjectURL(data.avatar)}
                  alt="banner.png"
                  className="w-64 h-64 object-cover rounded-full opacity-50 absolute"
                />
                <div className="relative flex flex-col items-center justify-center">
                  <IconCamera className="w-20 h-20"></IconCamera>
                  <div className="uppercase font-bold text-lg">
                    Change Image
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-2 py-4 focus:outline-none md:w-1/2 text-gray-800 placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold bg-transparent border-t-0 border-l-0 border-r-0 border-grey-200 text-lg focus:ring-0 border-b"
              placeholder="Subreddit Name"
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Subreddit Description"
              name="description"
              id="description"
              value={data.description}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="country"
              id="country"
              value={data.country}
              onChange={handleChange}
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
              className="w-full px-3 py-2 bg-transparent border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <option selected defaultValue={true} disabled>
                Select Subreddit Topic
              </option>
              {queryGetTopic.data?.data?.data?.map((topic) => (
                <option key={topic.id} value={topic.id}>
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
              checked={data.allowPost}
              onChange={handleChange}
              className="mr-2 cursor-pointer w-4 h-4"
            />
            <label htmlFor="allowPost" className="text-sm">
              Allow Post
            </label>
          </div>
          <div className="flex flex-row gap-x-5 items-center">
            <button
              type="submit"
              disabled={createSubredditMutation.isPending}
              className={`${
                createSubredditMutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
