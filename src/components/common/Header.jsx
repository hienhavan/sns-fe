import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPencilAlt,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  return (
    <header className="relative fix top-0 left-0 z-50 w-full">
      <div className="bg-[#34465d] h-[66px] px-4 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] flex items-center fixed">
        <div className="logo relative z-10 w-[10%] mr-9 ">
          <a title="" href="#">
            <img src="/public/logo_img.png" alt="logo" />
          </a>
        </div>
        <div className="flex items-center w-[150vh]">
          <div className="top-search relative w-full ">
            <form method="post" className="flex">
              <input
                type="text"
                placeholder="Search People, Pages, Groups etc"
                className="border-collapse border-gray-400 placeholder-gray-400 text-[15px] p-[9px_18px] w-[80%] rounded-[30px] bg-[#49586e] focus:outline-none focus:border-transparent text-white"
              />
              <button className="absolute right-2 top-2 bg-transparent border-none text-gray-400">
                <i className="ti-search"></i>
              </button>
            </form>
          </div>

          <div className="user-img relative cursor-pointer leading-[65px] flex w-[20%] justify-center items-center group">
            <h5 className="text-white inline-block text-[14px] font-medium mr-2">
              Jack Carter
            </h5>
            <img
              src=""
              alt=""
              className="rounded-full w-[50px] h-[50px] border-2 border-white border-opacity-80"
              style={{ transform: 'scale(0.8)' }}
            />
            <span className="status f-online absolute bottom-2 right-1"></span>

            <div className="user-setting text-center absolute right-14 top-[60px] w-40 bg-white shadow-lg  rounded-lg hidden group-hover:block z-10 items-center">
              <ul className="log-out ">
                <li className="py-1 hover:bg-gray-200 rounded-lg w-[100%]">
                  <a
                    href="#"
                    className="text-gray-600 flex items-center h-8 pl-5"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> View
                    Profile
                  </a>
                </li>
                <li className="py-1 hover:bg-gray-200 rounded-lg pl-5">
                  <a
                    href="setting.html"
                    className="text-gray-600 flex items-center h-8"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} className="mr-2" /> Edit
                    Profile
                  </a>
                </li>
                <li className="py-1 hover:bg-gray-200 rounded-lg pl-5">
                  <a
                    href="#"
                    className="text-gray-600 flex items-center h-8"
                  >
                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" /> Log
                    out
                  </a>
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
