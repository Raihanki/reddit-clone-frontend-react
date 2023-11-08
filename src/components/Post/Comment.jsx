import { IconDots } from "@tabler/icons-react";
import moment from "moment";

export default function Comment({ comment }) {
  return (
    <>
      <div
        className={`flex items-start justify-between gap-x-4 md:gap-x-6 lg:gap-x-10 ${
          comment.parentId === null ? "py-5" : "ml-10 lg:ml-16 py-3"
        }`}
      >
        <div className="flex flex-col">
          <p className="leading-relaxed">{comment.content}</p>
          <div className="pb-1">
            <span className="text-sm text-rose-700 cursor-pointer hover:text-rose-800">
              {comment.user.username}
            </span>
            <span className="text-sm text-gray-500 px-2">
              {moment(comment.created_at).startOf("day").fromNow()}
            </span>
          </div>
          <div>
            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
              Reply
            </span>
          </div>
        </div>
        <div>
          <IconDots></IconDots>
        </div>
      </div>
    </>
  );
}
