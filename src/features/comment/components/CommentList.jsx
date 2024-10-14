import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../services/comment.js';
import Comment from './Comment';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, isLoading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    // Dispatch action để lấy tất cả bình luận
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error}</p>;
  }

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments available</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
