import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux store
  const token = localStorage.getItem('token'); // Lấy token từ localStorage

  if (!token || !userData) {
    // Nếu không có token hoặc userData, điều hướng về trang login
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
