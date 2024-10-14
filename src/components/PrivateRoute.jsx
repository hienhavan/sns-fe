import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => {
    return state.auth
  }); // kiểm tra trạng thái đăng nhập từ Redux store

  console.log('private route auth ', auth)

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
