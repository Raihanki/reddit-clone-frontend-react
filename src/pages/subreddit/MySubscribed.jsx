import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ApiRequest from "../../api/RequestConfig";
import moment from "moment";

export default function MySubscribed() {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["subreddits"],
    queryFn: () => ApiRequest.get("/users/subscribtion"),
  });

  const subscribeMutation = useMutation({
    mutationKey: ["subscribe"],
    mutationFn: (data) => {
      return ApiRequest.post(`/subreddits/${data}/subscribe`);
    },
    onSuccess: () => {
      query.refetch();
    },
    onError: (err) => {
      if (err.response.status === 401) {
        navigate("/login");
      }
    },
  });

  const unsubscribeMutation = useMutation({
    mutationKey: ["unsubscribe"],
    mutationFn: (data) => {
      return ApiRequest.delete(`/subreddits/${data.subreddit}/unsubscribe`);
    },
    onSuccess: () => {
      query.refetch();
    },
    onError: (err) => {
      if (err.response.status === 401) {
        navigate("/login");
      }
    },
  });

  const handleSubscribe = (subreddit) => {
    subscribeMutation.mutate(subreddit);
  };

  const handleUnsubscribe = (subreddit) => {
    unsubscribeMutation.mutate({ subreddit });
  };

  if (query.isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loading></Loading>
      </div>
    );
  }

  if (query.isError) return <div>{query.error.message}</div>;
  return (
    <>
      <div className="border p-5 mt-5">
        <div className="flex flex-col">
          {query.data?.data?.data?.map((subreddit) => (
            <div
              className="flex items-center justify-between mb-5 border-b pb-5"
              key={subreddit.id}
            >
              <div className="flex gap-x-5 items-center">
                <div>
                  {subreddit.avatar !== null ? (
                    <img
                      src={subreddit.avatar}
                      alt="subreddit-avatar"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src="https://source.unsplash.com/random"
                      alt="subreddit-avatar"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </div>
                <div>
                  <div>
                    <Link
                      to={`/r/${subreddit.slug}`}
                      className="text-2xl font-medium text-slate-800 hover:text-orange-700 cursor-pointer"
                    >
                      {subreddit.name}
                    </Link>
                  </div>
                  <span className="text-slate-500 text-sm">
                    Subreddit created by. {subreddit.createdBy} at{" "}
                    {moment(subreddit.createdAt).format("DD MMMM YYYY")}
                  </span>
                </div>
              </div>
              <div>
                {subreddit.subscribed ? (
                  <button
                    onClick={() => handleUnsubscribe(subreddit.slug)}
                    className={`${
                      unsubscribeMutation.isPending
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75`}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(subreddit.slug)}
                    className={`${
                      subscribeMutation.isPending
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    } px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75`}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
