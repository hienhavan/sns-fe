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

export const createPost = async ({ content, userId, visibility, file }) => {
  const token = getTokenFromLocalStorage();

  // Tạo FormData để upload file và các trường khác
  const formData = new FormData();
  formData.append('content', content);
  formData.append('userId', userId);
  formData.append('visibility', visibility);

  // Nếu có file, thêm file vào formData
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await axios.post('http://localhost:8081/api/v1/posts', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Đảm bảo đúng kiểu dữ liệu khi có file
      },
    });
    console.log('API response:', response.data); // Kiểm tra dữ liệu từ API
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};




