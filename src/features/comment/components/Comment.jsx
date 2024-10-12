// src/components/Comments.jsx
import CommentList from './CommentList';

const Comments = ({ postId }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentList postId={postId} />
    </div>
  );
};

export default Comments;
