import { useState } from 'react';
import PostForm from './PostForm.jsx';
import { HiDotsHorizontal } from 'react-icons/hi';

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
      <div className="ml-0 flex border py-3 pl-2 pr-1 hover:bg-slate-100 sm:mx-3 sm:mr-0 sm:px-5 sm:pr-0 mb-[20px]">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            // TODO: avatar. Change to dynamic link
            src="../../public/logo_img.png"
            className="h-12 w-12 flex-none cursor-pointer rounded-full"
            alt="avatar"
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="relative flex w-full justify-between">
            <h2 className="cursor-pointer font-semibold">
              <span className="pl-1.5 font-normal text-slate-500">
                Trần Mạnh
              </span>
            </h2>

            {/* Icon to toggle options */}
            <HiDotsHorizontal
              className="mr-3 cursor-pointer"
              onClick={toggleOptions}
            />

            {/* Post Options Modal */}
            {showOptions && (
              <div className="w-30 h-22 absolute right-7 top-0 z-20 rounded-xl border border-slate-300 bg-white px-1 font-semibold text-slate-600 shadow-xl">
                <ul className="cursor-pointer p-0.5 text-start">
                  <li className="my-1 rounded p-1 hover:bg-slate-200">
                    Edit Post
                  </li>
                  <li className="my-1 rounded p-1 hover:bg-slate-200">
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </div>

          <p className="max-w-lg cursor-pointer break-words py-3">
            Đây là bài post hay nhất
          </p>

          <div className="mx-auto max-h-80 max-w-3xl cursor-pointer rounded-md bg-blue-100">
            <img
              // TODO: upload img. Change to dynamic link
              src="/public/login_img.jpg"
              className="mx-auto my-2 max-h-80 max-w-full rounded-md"
              alt="avatar"
            />
          </div>

          <p className="text-sm text-gray-600">Aug 15, 2020</p>

          <div className="flex justify-between pt-8">
            <div className="flex">
              <span className="pl-4 text-sm font-semibold">like</span>
            </div>

            <div className="flex">
              <span className="pl-4 text-sm font-semibold">Comment</span>
            </div>
          </div>
        </div>

      </div>
      <div className="ml-0 flex border py-3 pl-2 pr-1 hover:bg-slate-100 sm:mx-3 sm:mr-0 sm:px-5 sm:pr-0">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            // TODO: avatar. Change to dynamic link
            src="../../public/logo_img.png"
            className="h-12 w-12 flex-none cursor-pointer rounded-full"
            alt="avatar"
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="relative flex w-full justify-between">
            <h2 className="cursor-pointer font-semibold">
              <span className="pl-1.5 font-normal text-slate-500">
                Trần Mạnh
              </span>
            </h2>

            {/* Icon to toggle options */}
            <HiDotsHorizontal
              className="mr-3 cursor-pointer"
              onClick={toggleOptions}
            />

            {/* Post Options Modal */}
            {showOptions && (
              <div className="w-30 h-22 absolute right-7 top-0 z-20 rounded-xl border border-slate-300 bg-white px-1 font-semibold text-slate-600 shadow-xl">
                <ul className="cursor-pointer p-0.5 text-start">
                  <li className="my-1 rounded p-1 hover:bg-slate-200">
                    Edit Post
                  </li>
                  <li className="my-1 rounded p-1 hover:bg-slate-200">
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </div>

          <p className="max-w-lg cursor-pointer break-words py-3">
            Đây là bài post hay nhất
          </p>

          <div className="mx-auto max-h-80 max-w-3xl cursor-pointer rounded-md bg-blue-100">
            <img
              // TODO: upload img. Change to dynamic link
              src="/public/login_img.jpg"
              className="mx-auto my-2 max-h-80 max-w-full rounded-md"
              alt="avatar"
            />
          </div>

          <p className="text-sm text-gray-600">Aug 15, 2020</p>

          <div className="flex justify-between pt-8">
            <div className="flex">
              <span className="pl-4 text-sm font-semibold">like</span>
            </div>

            <div className="flex">
              <span className="pl-4 text-sm font-semibold">Comment</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Post;
