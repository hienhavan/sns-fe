import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../services/comment'; // Đảm bảo đường dẫn đúng

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentImage, setCommentImage] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

  // Xử lý gửi bình luận
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (!content) {
      setError('Nội dung bình luận không được để trống');
      return;
    }

    setError(null);
    setIsLoading(true); // Bắt đầu trạng thái loading

    try {
      // Gọi hàm addComment từ Redux để gửi bình luận
      await dispatch(
        addComment({ content, postId, file: commentImage }),
      ).unwrap();

      // Reset các trường sau khi gửi thành công
      setContent('');
      setCommentImage(null);
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi trong quá trình gửi bình luận');
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="modal-class">
      <form onSubmit={handleCommentSubmit} className="flex py-3">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src="/logo_img.png" // Đảm bảo đường dẫn tới hình ảnh avatar là chính xác
            className="h-12 w-12 flex-none rounded-full"
            alt="avatar"
          />
        </div>

        <div className="w-full px-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết bình luận..."
            className="mt-3 h-28 w-full resize-none rounded-xl bg-slate-100 p-2 pb-3 focus:outline-none"
          ></textarea>
          <div className="mx-auto max-h-80 max-w-xl rounded-md">
            {commentImage && (
              <img
                src={URL.createObjectURL(commentImage)}
                className="my-2 block max-h-20 max-w-full cursor-pointer rounded-md"
                alt="commentImage"
              />
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between">
            {content && (
              <button
                type="submit" // Đảm bảo đây là button gửi form
                className="rounded-xl bg-blue-600 p-2.5 pt-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Đang đăng...' : 'Đăng Bình Luận'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
