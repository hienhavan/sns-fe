import Footer from '../common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';
import { useFormik } from 'formik';
import registrationService from '../../services/registration';

export default function Register() {
  const navigate = useNavigate();

  const registrationSchema = object({
    email: string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await registrationService.registration(values);
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        alert('Registration failed, please try again.');
      }
    },
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-100">
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
              placeholder="Mật khẩu"
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              className={`w-full mb-4 p-3 border ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">
                  {formik.errors.confirmPassword}
                </p>
              )}

            <button
              type="submit"
              className="w-full bg-customGray text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Signup
            </button>

            <p className="block mt-4 text-black text-center">
              Already have an account?{' '}
              <Link to={'/login'} className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
