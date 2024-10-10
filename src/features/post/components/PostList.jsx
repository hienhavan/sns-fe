import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../store/postSlice';
import Post from './Post';
import PostForm from './PostForm.jsx';

const PostList = () => {
  const dispatch = useDispatch();

  const { posts, isLoading, error } = useSelector((state) => state.user);

  console.log("Posts in PostList component:", posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  if (!posts || posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <div>
      <div>
        <PostForm/>
      </div>
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>

  );
};

export default PostList;
