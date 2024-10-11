import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../services/post';
import { BsFillImageFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const PostForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [postImage, setPostImage] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { isLoading } = useSelector((state) => state.post);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostImage(file); // Cập nhật file khi người dùng chọn ảnh
    }
  };

  const handlePostSubmit = async () => {
    if (!content) {
      setError('Nội dung bài đăng không được để trống');
      return;
    }

    setError(null);

    dispatch(
      createPost({
        content,
        userId: user.id,
        visibility: 'PUBLIC',
        file: postImage, // Hình ảnh đính kèm
      }),
    );

    setContent('');
    setPostImage(null);
  };

  return (
    <div className="modal-class">
      {/* Sử dụng className để gán style */}
      <div className="flex py-3">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src="/public/logo_img.png"
            className="h-12 w-12 flex-none rounded-full"
            alt="avatar"
          />
        </div>

        <div className="w-full px-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            className="mt-3 h-28 w-full resize-none rounded-xl bg-slate-100 p-2 pb-3 focus:outline-none"
          ></textarea>
          <div className="mx-auto max-h-80 max-w-xl rounded-md">
            {postImage && (
              <img
                src={URL.createObjectURL(postImage)}
                className="my-2 block max-h-20 max-w-full cursor-pointer rounded-md"
                alt="postImage"
              />
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {/* Hiển thị lỗi nếu có */}
          <div className="flex justify-between">
            <label className="m-2 flex">
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <BsFillImageFill className="mt-1 cursor-pointer text-2xl text-blue-700" />
            </label>

            {/* Chỉ hiển thị nút "Đăng" nếu có nội dung */}
            {content && (
              <button
                className="rounded-xl bg-blue-600 p-2.5 pt-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg disabled:cursor-not-allowed"
                onClick={handlePostSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Đang đăng...' : 'Đăng Bài'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
