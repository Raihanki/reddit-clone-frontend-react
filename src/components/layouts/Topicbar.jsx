export default function Topicbar() {
  return (
    <div className="flex items-center bg-gray-100 px-7 py-3 gap-x-10">
      <div className="cursor-pointer">
        <span className="uppercase tracking-wide text-rose-800 hover:text-rose-900 text-sm">
          All Categories
        </span>
      </div>
      <div className="cursor-pointer">
        <span className="uppercase text-gray-800 hover:text-rose-900 tracking-wide text-sm">
          Programming
        </span>
      </div>
      <div className="cursor-pointer">
        <span className="uppercase text-gray-800 hover:text-rose-900 tracking-wide text-sm">
          Gamming
        </span>
      </div>
    </div>
  );
}
