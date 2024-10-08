import { Link, useLocation } from 'react-router-dom';
import { MdOutlineExplore, MdExplore } from 'react-icons/md';
import { FaRegUser, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const location = useLocation();

  return (
    <aside className="mt-[40px] hidden basis-1/6 sm:block lg:basis-1/5">
      <nav>
        <ul className="mr-1 px-2">
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
                  <h2 className="hidden px-1 text-xl font-bold xl:block">
                    Explore
                  </h2>
                </>
              ) : (
                <>
                  <MdOutlineExplore className="text-[1.6rem]" />
                  <h2 className="hidden px-1 text-xl xl:block">Explore</h2>
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
                  <h2 className="hidden px-1 text-xl font-bold xl:block">
                    Profile
                  </h2>
                </>
              ) : (
                <>
                  <FaRegUser className="text-[1.6rem]" />
                  <h2 className="hidden px-1 text-xl xl:block">Profile</h2>
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
