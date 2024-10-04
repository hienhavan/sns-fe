import loginService from '../../services/login';
import Footer from '../common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';

export default function Login() {
  const navigate = useNavigate();

  const loginSchema = object({
    email: string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await loginService.login(values);
        alert('Login successful!');
        navigate('/');
      } catch (error) {
        alert('Login failed, please check your credentials.');
      }
    },
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen  bg-blue-100">
        <div className="flex flex-col lg:flex-row items-center space-x-6 w-8/12">
          <div className="mb-8 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-customGray">
              Social media
            </h1>
            <p className="mt-4 text-lg lg:text-xl font-medium text-gray-700">
              Connect with friends and the world around you on Social.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md"
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`w-full mb-4 p-3 border ${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full mb-4 p-3 border ${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm mb-2">
                {formik.errors.password}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-customGray text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Log In
            </button>

            <a href="#" className="block mt-4 text-blue-600 text-center">
              Forgot Password?
            </a>

            <hr className="my-6 border-gray-200" />

            <Link
              to={'/register'}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition duration-300 text-center block"
            >
              Create New Account
            </Link>
            <div className="flex items-center justify-center my-6">
              <hr className="w-10 border-gray-300" />
              <p className="text-center text-gray-700 text-xs mx-4">
                Or Sign In with
              </p>
              <hr className="w-10 border-gray-300" />
            </div>
            <div className="w-full">
              <a
                href="#!"
                role="button"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300 text-center block"
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Login with Google
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
