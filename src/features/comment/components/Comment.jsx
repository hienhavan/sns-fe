const Comment = ({ comment, onReply, onDelete, onLike }) => {
  return (
    <div className="comment">
      <p>{comment.content}</p>
      <div className="comment-actions">
        <button onClick={() => onReply(comment.id)}>Reply</button>
        <button onClick={() => onLike(comment.id)}>
          {comment.isLiked ? 'Unlike' : 'Like'}
        </button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Comment;
