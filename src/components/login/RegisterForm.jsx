import registrationService from "../../services/registration"; // Thay đổi service cho đăng ký
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from 'yup';
import { useState } from 'react';

export default function Register() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const registrationSchema = object({
      email: string().email('Email không hợp lệ').required('Vui lòng nhập email'),
      password: string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
      confirmPassword: string()
      .oneOf([ref('password'), null], 'Mật khẩu xác nhận không khớp') 
      .required('Vui lòng xác nhận mật khẩu')
    });

    const handleRegister = async (e) => { 
        e.preventDefault();
        
        const formData = {
          email: e.target[0].value,
          password: e.target[1].value,
        };

        try {
            await registrationSchema.validate(formData, { abortEarly: false });
            
            await registrationService.registration(formData); 
            navigate('/login');
        } catch (validationErrors) {
            const errorMessages = validationErrors.inner.reduce((acc, error) => {
              return {...acc, [error.path]: error.message };
            }, {});
            setErrors(errorMessages);
        }
    };

    return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <div className="flex flex-col lg:flex-row items-center space-x-6 w-8/12">
        <div className="mb-8 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-customGray">Social media</h1>
            <p className="mt-4 text-lg lg:text-xl font-medium text-gray-700">
              Connect with friends and the world around you on Social.
            </p>
          </div>
      
          <form onSubmit={(e) => handleRegister(e)} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
            <input
              type="text"
              placeholder="Email"
              className={`w-full mb-4 p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
            
            <input
              type="password"
              placeholder="Mật khẩu"
              className={`w-full mb-4 p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
            
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className={`w-full mb-4 p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}
            
            <button
              type="submit"
              className="w-full bg-customGray text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Sigup
            </button>
            
            <p className="block mt-4 text-black text-center">
            Already have an account? <Link to={'/login'} className="text-blue-500">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer/>
    </>
    );
}
