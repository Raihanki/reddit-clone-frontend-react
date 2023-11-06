import SinglePost from "./SinglePost";

export default function AllPost() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 items-center">
      <SinglePost></SinglePost>
      <SinglePost></SinglePost>
      <SinglePost></SinglePost>
      <SinglePost></SinglePost>
      <SinglePost></SinglePost>
    </div>
  );
}
