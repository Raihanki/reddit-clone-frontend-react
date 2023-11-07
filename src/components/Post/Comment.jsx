import { IconDots } from "@tabler/icons-react";

export default function Comment(props) {
  const id = props.id ?? null;
  return (
    <>
      <div
        className={`flex items-start justify-between gap-x-4 md:gap-x-6 lg:gap-x-10 ${
          id ? "py-5" : "ml-10 lg:ml-16 py-3"
        }`}
      >
        <div className="flex flex-col">
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde velit
            eligendi excepturi nesciunt accusamus ea architecto aspernatur
            officiis laboriosam, tempora exercitationem praesentium dolores. Nam
            id nemo qui quos accusantium ut.
          </p>
          <div className="pb-1">
            <span className="text-sm text-rose-700 cursor-pointer hover:text-rose-800">
              tokisasikurumi02
            </span>
            <span className="text-sm text-gray-500 px-2">23 Minutes Ago</span>
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
