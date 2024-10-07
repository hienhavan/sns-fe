import { useState } from "react";
import PostForm from "./PostForm.jsx";
import { HiDotsHorizontal } from "react-icons/hi";

const Post = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="pb-20">
      <div className="pb-10">
        <PostForm />
      </div>
      <div className="flex border ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-slate-100 ">
        <div className="mt-3 w-12 h-12 text-lg flex-none">
          <img
            // TODO: avatar. Change to dynamic link
            src="../../public/logo_img.png"
            className="flex-none w-12 h-12 rounded-full cursor-pointer"
            alt="avatar"
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative">
            <h2 className="font-semibold cursor-pointer">
              <span className="text-slate-500 font-normal pl-1.5">Trần Mạnh</span>
            </h2>

            {/* Icon to toggle options */}
            <HiDotsHorizontal className="cursor-pointer mr-3" onClick={toggleOptions}/>

            {/* Post Options Modal */}
            {showOptions && (
              <div
                className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold absolute right-7 top-0 z-20 rounded-xl">
                <ul className="p-0.5 cursor-pointer text-start">
                  <li className="my-1 p-1 hover:bg-slate-200 rounded">Edit Post</li>
                  <li className="my-1 p-1 hover:bg-slate-200 rounded">Delete Post</li>
                </ul>
              </div>
            )}
          </div>

          <p className="py-3 cursor-pointer max-w-lg break-words">
            Đây là bài post hay nhất
          </p>

          <div className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer">
            <img
              // TODO: upload img. Change to dynamic link
              src="/public/login_img.jpg"
              className="max-w-full max-h-80 rounded-md my-2 mx-auto"
              alt="avatar"
            />
          </div>

          <p className="text-sm text-gray-600">Aug 15, 2020</p>

          <div className="flex justify-between pt-8">
            <div className="flex">
              <span className="text-sm pl-4 font-semibold">
                            like
                        </span>
            </div>

            <div className="flex">
              <span className="text-sm pl-4 font-semibold">
                            Comment
                        </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
