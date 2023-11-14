import { IconDots } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiRequest from "../../api/RequestConfig";
import { useState } from "react";
import Loading from "../Loading";
import moment from "moment-timezone";

export default function Comment({ comment, subreddit, post }) {
  const queryGetReply = useQuery({
    queryKey: ["replyComment", comment.id],
    queryFn: () => ApiRequest.get(`/posts/replyComment/${comment.id}`),
  });

  const [openDropdown, setOpenDropdown] = useState(false);
  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const [openReply, setOpenReply] = useState(false);
  const handleReply = () => {
    setOpenReply(!openReply);
  };

  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const createReplyCommentMutation = useMutation({
    mutationKey: ["replyComment"],
    mutationFn: (newComment) => {
      return ApiRequest.post(
        `/posts/${subreddit}/${post}/comments`,
        newComment
      );
    },
    onSuccess: (data) => {
      setContent("");
      queryClient.invalidateQueries({
        queryKey: ["replyComment", comment.id],
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createReplyCommentMutation.mutate({ content, parentId: comment.id });
  };

  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: () =>
      ApiRequest.delete(`/posts/${subreddit}/${post}/comments/${comment.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", post],
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCommentMutation.mutate();
  };

  if (queryGetReply.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (queryGetReply.isError) return <div>Something Went Wrong</div>;
  return (
    <>
      <div
        className={`flex items-start justify-between gap-x-4 md:gap-x-6 lg:gap-x-10 ${
          comment.parentId === null ? "py-5" : "ml-10 lg:ml-16 py-3"
        }`}
      >
        <div className="flex flex-col w-full">
          <p className="leading-relaxed">{comment.content}</p>
          <div className="pb-1">
            <span className="text-sm text-rose-700 cursor-pointer hover:text-rose-800">
              {comment.user.username}
            </span>
            <span className="text-sm text-gray-500 px-2">
              {moment.utc(comment.createdAt).fromNow()}
            </span>
          </div>
          <div className="">
            <span
              className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer"
              onClick={handleReply}
            >
              Reply Comment
            </span>
            <form
              onSubmit={handleSubmit}
              className={`mt-1 ${openReply ? "block" : "hidden"}`}
            >
              <div className="mb-3">
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
                disabled={createReplyCommentMutation.isPending}
                className={`${
                  createReplyCommentMutation.isPending
                    ? "cursor-not-allowed opacity-50"
                    : ""
                } px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-75`}
              >
                Reply
              </button>
            </form>
          </div>
        </div>
        <div className="relative">
          <IconDots
            className="cursor-pointer hover:text-orange-700"
            onClick={handleDropdown}
          ></IconDots>
          <div
            className={`bg-white shadow border p-3 top-5 right-0 absolute flex flex-col gap-y-2 ${
              openDropdown ? "block" : "hidden"
            }`}
          >
            <span
              className="text-sm text-gray-500 cursor-pointer hover:text-rose-700"
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>
      </div>

      {/* reply commment */}
      {queryGetReply.data?.data?.data?.map((reply) => (
        <div
          key={reply.id}
          className={`flex items-start justify-between gap-x-4 md:gap-x-6 lg:gap-x-10 ml-10 lg:ml-16 py-3`}
        >
          <div className="flex flex-col w-full">
            <p className="leading-relaxed">{reply.content}</p>
            <div className="pb-1">
              <span className="text-sm text-rose-700 cursor-pointer hover:text-rose-800">
                {reply.user.username}
              </span>
              <span className="text-sm text-gray-500 px-2">
                {moment.utc(reply.createdAt).fromNow()}
              </span>
            </div>
            <div>Delete</div>
          </div>
        </div>
      ))}
    </>
  );
}
