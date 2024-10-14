import { useEffect } from 'react';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx'; // Import CommentForm
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchComments, addComment } from '../services/comment'; // Điều chỉnh import nếu cần

const Comments = ({ postId }) => {
  const dispatch = useDispatch();

  // Fetch comments when the component mounts or postId changes
  // useEffect(() => {
  //   const loadComments = async () => {
  //     try {
  //       dispatch(fetchComments(postId)).unwrap();
  //     } catch (error) {
  //       console.error('Failed to fetch comments:', error);
  //       toast.error('Có lỗi xảy ra khi lấy bình luận.');
  //     }
  //   };
  //
  //   loadComments();
  // }, [dispatch, postId]);

  // Hàm gửi bình luận
  const handleCommentSubmit = async () => {
    // Kiểm tra xem bình luận đã tồn tại hay chưa
    // if (!commentData.content) return; // Tránh thêm bình luận rỗng

    try {
      await dispatch(addComment({ postId, ...commentData })).unwrap(); // Thêm bình luận
      toast.success('Bình luận đã được thêm thành công!'); // Thông báo thành công
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Có lỗi xảy ra khi thêm bình luận.');
    }
  };

  return (
    <div>
      <h2>Bình luận</h2>
      <CommentForm postId={postId} onSubmit={handleCommentSubmit} /> {/* Sử dụng CommentForm */}
      <CommentList postId={postId} /> {/* Truyền postId cho CommentList */}
    </div>
  );
};

export default Comments;
