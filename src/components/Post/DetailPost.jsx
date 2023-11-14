import {
  IconArrowBigDown,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import Comment from "./Comment";
import ApiRequest from "../../api/RequestConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import moment from "moment";
import { useEffect, useState } from "react";
import { IconArrowBigUp } from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";

export default function DetailPost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();
  const { subreddit, post } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", post],
    queryFn: () => ApiRequest.get(`/posts/${subreddit}/${post}`),
  });

  const dataPost = data?.data?.data;

  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const createCommentMutation = useMutation({
    mutationFn: (newComment) =>
      ApiRequest.post(
        `/posts/${dataPost.subreddit.slug}/${dataPost.slug}/comments`,
        newComment
      ),
    onSuccess: (data) => {
      setContent("");
      queryClient.invalidateQueries({
        queryKey: ["post", post],
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCommentMutation.mutate({ content });
  };

  const deletePostMutation = useMutation({
    mutationFn: () => ApiRequest.delete(`/posts/${subreddit}/${dataPost.slug}`),
    onSuccess: () => {
      navigate(`/r/${subreddit}`);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deletePostMutation.mutate();
  };

  const [voteType, setVoteType] = useState(data?.data?.data.myVote);

  const createVoteMutation = useMutation({
    mutationFn: (data) => {
      if (dataPost.myVote === null) {
        return ApiRequest.post(`/votes/${dataPost.id}`, data);
      } else if (dataPost.myVote === data.voteType) {
        return ApiRequest.delete(`/votes/${dataPost.id}`);
      } else {
        return ApiRequest.put(`/votes/${dataPost.id}`, data);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["post", post],
      });
    },
  });

  useEffect(() => {
    setVoteType(data?.data?.data?.myVote);
  }, [data]);

  const handleUpVoteClick = (e) => {
    e.preventDefault();
    setVoteType("up");
    createVoteMutation.mutate({ voteType: "up" });
  };

  const handleDownVoteClick = (e) => {
    e.preventDefault();
    setVoteType("down");
    createVoteMutation.mutate({ voteType: "down" });
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }
  if (isError) return <div>Something Went Wrong</div>;

  return (
    <>
      <div className="flex flex-col max-w-full lg:max-w-5xl">
        <div className="flex items-start gap-x-4 md:gap-x-6 lg:gap-x-10">
          <div className="flex flex-col items-center gap-y-2">
            <IconChevronUp />
            <div>
              <span>{dataPost.upVotes - dataPost.downVotes}</span>
            </div>
            <IconChevronDown />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium">{dataPost.title}</h2>
            <div>
              <span className="text-sm">
                {moment(dataPost.created_at).startOf("day").fromNow()} by{" "}
                <span className="text-orange-700">
                  {" "}
                  {dataPost.user.username}
                </span>
                <span>
                  {" "}
                  in{" "}
                  <Link
                    className="cursor-pointer text-rose-800 hover:text-rose-900"
                    to={`/r/${dataPost.subreddit.slug}`}
                  >
                    /r/{dataPost.subreddit.slug}
                  </Link>
                </span>
              </span>
            </div>
            <div className="py-10">
              <p className="leading-relaxed">{dataPost.content}</p>
              {/* <div className="mt-5">
                <img
                  src="https://source.unsplash.com/random"
                  alt="card-image"
                  className="w-auto h-[400px] object-cover"
                />
              </div> */}
            </div>
            <div className="mb-4 flex items-center gap-x-5">
              {authenticatedUser.id === dataPost.user.id ||
                (authenticatedUser.username ===
                  dataPost.subreddit.createdBy && (
                  <button
                    type="submit"
                    disabled={deletePostMutation.isPending}
                    onClick={handleDelete}
                    className={`${
                      deletePostMutation.isPending
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } px-3 py-2 bg-rose-600 hover:bg-rose-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 transition duration-75`}
                  >
                    Delete
                  </button>
                ))}
              <div className="flex items-center gap-x-2">
                <IconArrowBigUp
                  onClick={handleUpVoteClick}
                  className={`text-orange-800 w-8 h-8 cursor-pointer hover:fill-orange-800 ${
                    data?.data?.data?.myVote === "up" && "fill-orange-800"
                  }`}
                />
              </div>
              <IconArrowBigDown
                onClick={handleDownVoteClick}
                className={`text-orange-800 w-8 h-8 cursor-pointer hover:fill-orange-800 ${
                  data?.data?.data?.myVote === "down" && "fill-orange-800"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      {/* comments */}
      <div className="border-t border-gray-300"></div>
      <div className="flex items-center justify-between mx-2 md:mx-8 lg:mx-16 my-10">
        <div>{dataPost.commentCount} Comments</div>
        <div className="px-3 py-2 bg-gray-100">Filter By: Recently Added</div>
      </div>
      <div className="bg-gray-100 p-5 mx-2 md:mx-8 lg:mx-16 my-10">
        <div className={`border mb-5 p-3`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="content" className="text-sm">
                Write Your Opinion
              </label>
              <textarea
                name="content"
                id="content"
                onChange={handleChange}
                required
                value={content}
                className="w-full px-3 py-1.5 border border-gray-400 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={createCommentMutation.isPending}
              className={`${
                createCommentMutation.isPending
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } px-3 py-2 bg-violet-600 hover:bg-violet-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition duration-75`}
            >
              Publish
            </button>
          </form>
        </div>
        {dataPost.comments
          .filter((comment) => comment.parentId === null)
          .map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              subreddit={dataPost.subreddit.slug}
              post={dataPost.slug}
            ></Comment>
          ))}
      </div>
    </>
  );
}
