import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import Home from './features/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import UpdateProfile from './features/user/components/UpdateProfile';
import UserProfile from './features/user/components/Profile';
import PrivateRoute from './components/PrivateRoute';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            {/* Bảo vệ các route sau bằng PrivateRoute */}
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/me"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
