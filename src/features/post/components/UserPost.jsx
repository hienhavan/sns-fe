import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../services/post';
import Post from './Post';

const UserPost = () => {
  const dispatch = useDispatch();

  // Lấy các bài viết từ Redux state
  const { posts, isLoading, error } = useSelector((state) => state.user);

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('sns-user'));
  const userId = user ? user.id : null; // Lấy userId từ thông tin người dùng

  console.log('User ID:', userId);
  console.log('Posts in UserPost component:', posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  // Lọc bài viết theo ID người dùng
  const userPosts = posts.filter((post) => post.userId === userId);

  if (userPosts.length === 0) {
    return <p>No posts available for this user.</p>;
  }

  return (
    <div>
      {userPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPost;
