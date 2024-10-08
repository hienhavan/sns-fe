import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // kiểm tra trạng thái đăng nhập từ Redux store

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
