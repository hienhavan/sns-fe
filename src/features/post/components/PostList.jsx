import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../services/post.js';
import Post from './Post';
import PostForm from './PostForm.jsx';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  return (
    <div>
      <div>
        <PostForm />
      </div>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}

        </div>
      )}
    </div>
  );
};

export default PostList;