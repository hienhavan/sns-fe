import './App.css'
import {Outlet, Route, Routes} from 'react-router-dom'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/login/RegisterForm'

function App() {

  return (
    <>
        <Routes>
          <Route path={'/login'} element={<LoginForm/>}></Route>
          <Route path={'/register'} element={<RegisterForm/>}></Route>
        </Routes>
    </>
  )
}

export default App
