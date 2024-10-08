import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/store/authSlice'
import {
  faUser,
  faPencilAlt,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="fix relative left-0 top-0 z-50 w-full">
      <div className="fixed flex h-[66px] items-center bg-[#34465d] px-4 shadow-[0px_0px_5px_rgba(0,0,0,0.2)]">
        <div className="logo relative z-10 mr-9 w-[10%]">
          <Link title="" to="/">
            <img src="/public/logo_img.png" alt="logo" />
          </Link>
        </div>
        <div className="flex w-[150vh] items-center">
          <div className="top-search relative w-full">
            <form method="post" className="flex">
              <input
                type="text"
                placeholder="Search People, Pages, Groups etc"
                className="w-[80%] border-collapse rounded-l-[30px] border-gray-400 bg-[#49586e] p-[9px_18px] text-[15px] text-white placeholder-gray-400 focus:border-transparent focus:outline-none"
              />
              <button className="border-collapse rounded-r-[30px] bg-[#49586e] pl-3 pr-3 text-white hover:bg-slate-500">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />{' '}
              </button>
            </form>
          </div>

          <div className="user-img group relative flex w-[20%] cursor-pointer items-center justify-center leading-[65px]">
            <h5 className="mr-2 inline-block text-[14px] font-medium text-white">
              Jack Carter
            </h5>
            <img
              src=""
              alt=""
              className="h-[50px] w-[50px] rounded-full border-2 border-white border-opacity-80"
              style={{ transform: 'scale(0.8)' }}
            />
            <span className="status f-online absolute bottom-2 right-1"></span>

            <div className="user-setting absolute right-14 top-[60px] z-10 hidden w-40 items-center rounded-lg bg-white text-center shadow-lg group-hover:block">
              <ul className="log-out">
                <li className="w-[100%] rounded-lg py-1 hover:bg-gray-200">
                  <Link
                    to="/login"
                    className="flex h-8 items-center pl-5 text-gray-600"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> View
                    Profile
                  </Link>
                </li>
                <li className="rounded-lg py-1 pl-5 hover:bg-gray-200">
                  <Link
                    to="/update-profile"
                    className="flex h-8 items-center text-gray-600"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Edit
                    Profile
                  </Link>
                </li>
                <li className="rounded-lg py-1 pl-5 hover:bg-gray-200">
                  <Link to="/login" className="flex h-8 items-center text-gray-600" onClick={handleLogout} >
                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" /> Log
                    out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
