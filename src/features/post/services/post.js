// services.js
import axios from 'axios';

const getTokenFromLocalStorage = () => {
  const user = window.localStorage.getItem('sns-user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.token;
  }
  return null;
};

export const getAllPosts = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`/apihost/api/v1/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response.data); // Kiểm tra dữ liệu từ API
    return response.data;  // Trả về trực tiếp mảng bài đăng
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


