import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

const Post = ({ post }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="pb-20">
      <div className="ml-0 flex border py-3 pl-2 pr-1 hover:bg-slate-100 sm:mx-3 sm:mr-0 sm:px-5 sm:pr-0">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src="../../public/logo_img.png"
            className="h-12 w-12 flex-none cursor-pointer rounded-full object-cover"
            alt="avatar"
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="relative flex w-full justify-between">
            <h2 className="cursor-pointer font-semibold">
              <span className="pl-1.5 font-normal text-slate-500">
                User {post.userId}
              </span>
            </h2>

            {/* Icon để hiển thị tùy chọn */}
            <HiDotsHorizontal
              className="mr-3 cursor-pointer"
              onClick={toggleOptions}
            />

            {/* Modal tùy chọn bài đăng */}
            {showOptions && (
              <div className="w-30 h-22 absolute right-7 top-0 z-20 rounded-xl border border-slate-300 bg-white px-1 font-semibold text-slate-600 shadow-xl">
                <ul className="cursor-pointer p-0.5 text-start">
                  <li className="my-1 rounded p-1 hover:bg-slate-200">Edit Post</li>
                  <li className="my-1 rounded p-1 hover:bg-slate-200">Delete Post</li>
                </ul>
              </div>
            )}
          </div>

          <p className="max-w-lg cursor-pointer break-words py-3">
            {post.content}
          </p>

          {/* Kiểm tra xem có ảnh trong mảng media không */}
          {post.media && post.media.length > 0 && (
            <div className="mx-auto max-h-80 max-w-3xl cursor-pointer rounded-md bg-blue-100">
              {post.media.map((mediaItem, index) => (
                <img
                  key={mediaItem.id} // Sử dụng ID làm key
                  src={`/apihost${mediaItem.url}`} // Đảm bảo mediaItem có thuộc tính url
                  className="mx-auto my-2 max-h-80 max-w-full rounded-md"
                  alt={`post media ${index + 1}`} // Sử dụng index trong alt cho khả năng truy cập tốt hơn
                />
              ))}
            </div>
          )}

          <p className="text-sm text-gray-600">{post.createdAt || 'Unknown Date'}</p>

          <div className="flex justify-between pt-8">
            <div className="flex">
              <span className="pl-4 text-sm font-semibold">Like</span>
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
