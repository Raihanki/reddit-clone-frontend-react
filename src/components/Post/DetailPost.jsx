import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Comment from "./Comment";

export default function DetailPost() {
  return (
    <>
      <div className="flex flex-col max-w-full lg:max-w-5xl">
        <div className="flex items-start gap-x-4 md:gap-x-6 lg:gap-x-10">
          <div className="flex flex-col items-center gap-y-2">
            <IconChevronUp />
            <div>
              <span>20.1k</span>
            </div>
            <IconChevronDown />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium">
              13 years ago today, a true patriot lost his life. Rest in Peace
              big guy.
            </h2>
            <div>
              <span className="text-sm">
                2 hours ago by{" "}
                <span className="text-orange-700">Raihanhori</span>
              </span>
            </div>
            <div className="py-10">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                error inventore sed minima maxime minus molestiae velit dolore
                fugiat blanditiis et dolorum laborum qui, cumque a dolor! Vero,
                iste hic!
              </p>
              <div className="mt-5">
                <img
                  src="https://source.unsplash.com/random"
                  alt="card-image"
                  className="w-auto h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* comments */}
      <div className="border-t border-gray-300"></div>
      <div className="flex items-center justify-between mx-2 md:mx-8 lg:mx-16 my-10">
        <div>2133 Comments</div>
        <div className="px-3 py-2 bg-gray-100">Filter By: Recently Added</div>
      </div>
      <div className="bg-gray-100 p-5 mx-2 md:mx-8 lg:mx-16 my-10">
        <Comment id="10"></Comment>
        <Comment></Comment>
        <Comment id="10"></Comment>
        <Comment id="10"></Comment>
      </div>
    </>
  );
}
