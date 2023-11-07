import AllPost from "../components/Post/AllPost";

export default function Home() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl text-center text-slate-800">
          Find something interesting to discuss
        </h1>
      </div>
      <div>
        <AllPost></AllPost>
      </div>
    </>
  );
}
