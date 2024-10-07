import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import Home from './components/home/Home';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default App;
