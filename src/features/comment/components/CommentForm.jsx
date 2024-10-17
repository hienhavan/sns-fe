import { useState } from 'react';

const CommentForm = ({ initialValue = '', onSubmit }) => {
  const [content, setContent] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return alert('Content cannot be empty');
    }
    onSubmit(content);
    setContent(''); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
