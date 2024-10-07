import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import authService from './services/auth';

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
        await authService.registration(values);
        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.log(error);
        alert('Registration failed, please try again.');
      }
    },
  });

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-blue-100">
        <div className="flex w-8/12 flex-col items-center space-x-6 lg:flex-row">
          <div className="mb-8 text-center lg:mb-0 lg:text-left">
            <h1 className="text-4xl font-bold text-customGray lg:text-5xl">
              Social media
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-700 lg:text-xl">
              Connect with friends and the world around you on Social.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`mb-4 w-full border p-3 ${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mb-2 text-sm text-red-500">{formik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className={`mb-4 w-full border p-3 ${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mb-2 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              className={`mb-4 w-full border p-3 ${
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
                <p className="mb-2 text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}

            <button
              type="submit"
              className="w-full rounded-lg bg-customGray py-3 font-semibold text-white transition duration-300 hover:bg-blue-500"
            >
              Signup
            </button>

            <p className="mt-4 block text-center text-black">
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
