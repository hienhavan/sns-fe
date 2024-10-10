import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => {
    console.log('state ', state.auth)
    return state.auth
  }); // kiểm tra trạng thái đăng nhập từ Redux store

  console.log('private route ', isAuthenticated)
  console.log()

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
