import { login } from '../services/auth';
import Footer from '../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        // // Gọi dịch vụ đăng nhập, sẽ trả về một token
        const token = await login(values);

        // Dispatch hành động loginSuccess với dữ liệu người dùng hoặc token
        dispatch(login(values));
        dispatch(loginSuccess(token))

        // Tùy chọn lưu token vào local storage
        localStorage.setItem('token', token);

        // Chuyển hướng đến trang chính hoặc trang khác
        navigate('/');
      } catch (error) {
        console.log(error);
        alert(
          'Đăng nhập thất bại, vui lòng kiểm tra thông tin xác thực của bạn.',
        );
      }
    },
  });

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-blue-100">
        <div className="flex w-8/12 flex-col items-center space-x-6 lg:flex-row">
          <div className="mb-8 text-center lg:mb-0 lg:text-left">
            <h1 className="text-4xl font-bold text-customGray lg:text-5xl">
              Mạng xã hội
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-700 lg:text-xl">
              Kết nối với bạn bè và thế giới xung quanh bạn trên Social.
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
              className={`mb-4 w-full border p-3 ${formik.errors.email && formik.touched.email
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
              className={`mb-4 w-full border p-3 ${formik.errors.password && formik.touched.password
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

            <button
              type="submit"
              className="w-full rounded-lg bg-customGray py-3 font-semibold text-white transition duration-300 hover:bg-blue-500"
            >
              Đăng Nhập
            </button>

            <a href="#" className="mt-4 block text-center text-blue-600">
              Quên Mật Khẩu?
            </a>

            <hr className="my-6 border-gray-200" />

            <Link
              to={'/register'}
              className="block w-full rounded-lg bg-green-600 py-3 text-center font-semibold text-white transition duration-300 hover:bg-green-500"
            >
              Tạo Tài Khoản Mới
            </Link>
            <div className="my-6 flex items-center justify-center">
              <hr className="w-10 border-gray-300" />
              <p className="mx-4 text-center text-xs text-gray-700">
                Hoặc Đăng Nhập bằng
              </p>
              <hr className="w-10 border-gray-300" />
            </div>
            <div className="w-full">
              <a
                href="http://localhost:8080/v1/auth/google"
                role="button"
                className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition duration-300 hover:bg-blue-500"
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Đăng Nhập bằng Google
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
