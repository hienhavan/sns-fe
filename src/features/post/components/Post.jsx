import { HiDotsHorizontal } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, updatePost, likePost, unlikePost, countLikes } from '../services/post'; // Import countLikes
import { toast } from 'react-toastify';
import { FaComments } from 'react-icons/fa';
import Comment from '../../comment/components/Comment.jsx';

const Post = ({ post }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [visibility, setVisibility] = useState(post.visibility);
  const [media, setMedia] = useState([]);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const resultAction = await dispatch(countLikes(post.id)).unwrap();
        setLikeCount(resultAction);
      } catch (error) {
        console.error('Failed to fetch like count:', error);
        toast.error('Có lỗi xảy ra khi lấy số lượng thích.');
      }
    };

    fetchLikeCount();
  }, [dispatch, post.id]);

  const handleLike = () => {
    const action = isLiked ? unlikePost : likePost;
    dispatch(action(post.id));
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const toggleOptions = () => setShowOptions((prev) => !prev);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleDeletePost = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
      try {
        await dispatch(deletePost(post.id)).unwrap();
        toast.success('Bài đăng đã được xóa thành công!');
      } catch (error) {
        console.error('Xóa bài đăng không thành công: ', error);
        toast.error('Có lỗi xảy ra khi xóa bài đăng.');
      }
    }
  };

  const handleEditPost = async () => {
    if (!content.trim()) {
      toast.error('Nội dung không được để trống!');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('visibility', visibility);
    media.forEach((file) => formData.append('file', file));

    try {
      await dispatch(updatePost({
        postId: post.id, // Gán ID của bài viết vào đây
        content,
        visibility,
        media
      })).unwrap();
      toast.success('Bài đăng đã được cập nhật thành công!');
      setIsEditing(false);
    } catch (error) {
      console.error('Cập nhật bài đăng không thành công: ', error);
      toast.error('Có lỗi xảy ra khi cập nhật bài đăng.');
    }
  };


  const getVisibilityText = (visibility) => {
    const visibilityTexts = {
      PRIVATE: 'Riêng tư',
      FRIENDS_ONLY: 'Chỉ bạn bè',
      PUBLIC: 'Công khai',
    };
    return visibilityTexts[visibility] || 'Không xác định';
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const renderMedia = () => (
    <div className="mx-auto max-h-80 max-w-3xl cursor-pointer rounded-md bg-blue-100">
      {post.media.map((mediaItem, index) => (
        <img
          key={mediaItem.id}
          src={`/apihost${mediaItem.url}`}
          className="mx-auto my-2 max-h-80 max-w-full rounded-md"
          alt={`post media ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="pb-5">
      <div className="ml-0 flex border py-3 pl-2 pr-1 hover:bg-slate-100 sm:mx-3 sm:mr-0 sm:px-5 sm:pr-0">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src="/logo_img.png"
            className="h-12 w-12 flex-none cursor-pointer rounded-full object-cover"
            alt="avatar"
          />
        </div>

        <div className="w-full px-4 py-3">
          <div className="relative flex w-full justify-between">
            <h2 className="cursor-pointer font-semibold flex items-center">
              <span className="pl-1.5 font-normal text-slate-500">
                User {post.userId}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                ({getVisibilityText(post.visibility)})
              </span>
            </h2>

            <HiDotsHorizontal
              className="mr-3 cursor-pointer"
              onClick={toggleOptions}
            />

            {showOptions && (
              <div className="w-30 h-22 absolute right-7 top-0 z-20 rounded-xl border border-slate-300 bg-white px-1 font-semibold text-slate-600 shadow-xl">
                <ul className="cursor-pointer p-0.5 text-start">
                  <li
                    className="my-1 rounded p-1 hover:bg-slate-200"
                    onClick={() => setIsEditing(true)}
                  >
                    Cập nhật
                  </li>
                  <li
                    className="my-1 rounded p-1 hover:bg-slate-200"
                    onClick={handleDeletePost}
                  >
                    Xoá
                  </li>
                </ul>
              </div>
            )}
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-3 w-full resize-none rounded-xl bg-slate-100 p-2 pb-3 focus:outline-none"
              />
              <div className="mt-2">
                <label className="block mb-1 font-semibold">Tính năng hiển thị:</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full rounded-xl bg-slate-100 p-2 focus:outline-none"
                >
                  <option value="PUBLIC">Công khai</option>
                  <option value="FRIENDS_ONLY">Chỉ bạn bè</option>
                  <option value="PRIVATE">Riêng tư</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block mb-1 font-semibold">Chọn hình ảnh:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMediaChange}
                  className="w-full rounded-xl bg-slate-100 p-2 focus:outline-none"
                />
              </div>
              <button
                className="mt-2 rounded-xl bg-blue-600 p-2 text-white"
                onClick={handleEditPost}
              >
                Cập nhật
              </button>
              <button
                className="mt-2 ml-2 rounded-xl bg-red-600 p-2 text-white"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </button>
            </div>
          ) : (
            <p className="max-w-lg cursor-pointer break-words py-3">
              {post.content}
            </p>
          )}

          {post.media && post.media.length > 0 && renderMedia()}

          <p className="text-sm text-gray-600">{formatDate(post.createdAt) || 'Unknown Date'}</p>

          <div className="flex justify-between pt-2">
            <div className="flex items-center">
              <span className="text-lg cursor-pointer" onClick={handleLike}>
                {isLiked ? '❤️' : '🤍'} {likeCount} Thích
              </span>
            </div>

            <div className="flex items-center">
              <FaComments
                className="cursor-pointer text-xl"
                onClick={() => setShowComments((prev) => !prev)}
              />
              <span className="ml-1">{comments.length} Bình luận</span>
            </div>
          </div>

          {showComments && (
            <Comment comments={comments} onAddComment={handleAddComment} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
