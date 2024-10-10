import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, clearMessages } from '../store/postSlice';
import PostForm from './PostForm.jsx';
import { HiDotsHorizontal } from 'react-icons/hi';

const UserPost = () => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const avatarUrl = "/logo_img.png"; // Đường dẫn avatar đã được cập nhật
  const postImageUrl = "/login_img.jpg"; // Đường dẫn hình ảnh bài đăng đã được cập nhật

  useEffect(() => {
    if (message) {
      alert(message); // Hiển thị thông báo thành công
      setMessage(null); // Reset message
    }
    if (error) {
      alert(error); // Hiển thị thông báo lỗi
      setError(null); // Reset error
    }
  }, [message, error]);

  const handleCreatePost = (postData) => {
    // Gửi bài viết mới và xử lý kết quả
    dispatch(createPost(postData))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          setMessage('Post created successfully!'); // Thiết lập thông báo thành công
        } else {
          setError('Failed to create post.'); // Thiết lập thông báo lỗi
        }
        dispatch(clearMessages()); // Xóa thông báo sau khi hiển thị
      });
  };

  return (
    <div className="pb-20">
      <div className="pb-10">
        <PostForm onCreatePost={handleCreatePost} /> {/* Truyền hàm gửi bài viết */}
      </div>
      <div className="ml-0 flex border py-3 pl-2 pr-1 hover:bg-slate-100 sm:mx-3 sm:mr-0 sm:px-5 sm:pr-0">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src={avatarUrl} // Sử dụng biến để lấy đường dẫn avatar
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

            {/* Icon để chuyển đổi tùy chọn */}
            <HiDotsHorizontal
              className="mr-3 cursor-pointer"
              onClick={toggleOptions}
            />

            {/* Modal Tùy chọn Bài đăng */}
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
              src={postImageUrl} // Sử dụng biến để lấy đường dẫn hình ảnh bài đăng
              className="mx-auto my-2 max-h-80 max-w-full rounded-md"
              alt="Post visual"
            />
          </div>

          <p className="text-sm text-gray-600">Aug 15, 2020</p>

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

export default UserPost;
