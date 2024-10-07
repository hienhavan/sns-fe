import './App.css';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import Home from './features/home/Home';
import Header from './components/Header';
import Footer from './components/Footer';

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
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
