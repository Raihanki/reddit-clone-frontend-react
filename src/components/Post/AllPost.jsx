import { useQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
import ApiRequest from "../../api/RequestConfig";
import Loading from "../Loading";
import { useLocation } from "react-router-dom";

export default function AllPost({ subreddit = null }) {
  const location = useLocation();
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (location.pathname === "/") {
        return ApiRequest.get("/posts");
      } else if (location.pathname === "/u/posts") {
        return ApiRequest.get("/posts/myPost");
      } else if (subreddit && location.pathname === `/r/${subreddit}`) {
        return ApiRequest.get(`/posts/${subreddit}`);
      }
    },
  });

  if (query.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (query.isError) return <div>Something Went Wrong</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 items-center">
      {query.data?.data?.data?.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
