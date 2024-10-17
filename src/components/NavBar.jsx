import { Link, useLocation } from 'react-router-dom';
import { MdOutlineExplore, MdExplore } from 'react-icons/md';
import { FaRegUser, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const location = useLocation();

  return (
    <aside className="mt-[40px] hidden sm:block">
      <nav>
        <ul className="px-2">
          {/* Explore Link */}
          <li>
            <Link
              to="/"
              className={`flex cursor-pointer gap-3 rounded-[15rem] px-3 py-4 hover:bg-slate-200 active:bg-slate-100 ${
                location.pathname === '/' ? 'font-bold' : ''
              }`}
            >
              {location.pathname === '/' ? (
                <>
                  <MdExplore className="text-[1.6rem] font-bold" />
                  <h2 className="hidden px-1 text-xl font-bold lg:block">
                    Explore
                  </h2>
                </>
              ) : (
                <>
                  <MdOutlineExplore className="text-[1.6rem]" />
                  <h2 className="hidden px-1 text-xl lg:block">Explore</h2>
                </>
              )}
            </Link>
          </li>

          {/* Profile Link */}
          <li>
            <Link
              to="/me"
              className={`flex cursor-pointer gap-3 rounded-[15rem] px-3 py-4 hover:bg-slate-200 active:bg-slate-100 ${
                location.pathname === '/me' ? 'font-bold' : ''
              }`}
            >
              {location.pathname === '/me' ? (
                <>
                  <FaUser className="text-[1.6rem] font-bold" />
                  <h2 className="hidden px-1 text-xl font-bold lg:block">
                    Profile
                  </h2>
                </>
              ) : (
                <>
                  <FaRegUser className="text-[1.6rem]" />
                  <h2 className="hidden px-1 text-xl lg:block">Profile</h2>
                </>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavBar;
