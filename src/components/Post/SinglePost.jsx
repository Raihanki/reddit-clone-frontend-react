import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconMessage,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function SinglePost(props) {
  const post = props.post;

  return (
    <Link
      to={`/r/${post.subreddit.slug}/${post.slug}`}
      className="shadow-lg flex flex-col cursor-pointer hover:bg-gray-100"
    >
      <div>
        <img
          src="https://source.unsplash.com/random"
          alt="card-image"
          className="w-full h-[350px] object-cover"
        />
      </div>
      <div className="py-5 px-5">
        <h3 className="text-gray-800 text-xl">{post.title}</h3>
        <div>
          <span className="text-gray-700 text-sm">
            {moment(post.created_at).startOf("day").fromNow()} by{" "}
            {post.user.username}
          </span>
        </div>
        <div>
          <span className="text-orange-700 text-sm">
            {post.subreddit
              ? `/r/${post.subreddit.slug}`
              : `/u/${post.user.username}`}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <IconArrowBigUp className="text-orange-800 w-8 h-8" />
              <span>{post.upVotes - post.downVotes}</span>
            </div>
            <IconArrowBigDown className="text-orange-800 w-8 h-8" />
          </div>
          <div className="flex items-center gap-x-2">
            <IconMessage className="text-orange-800 w-8 h-8 fill-orange-800" />
            <span>{post.commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
