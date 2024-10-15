import { Link } from 'react-router-dom';
import { faChartSimple, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ASideLeft = () => {
  const items = [
    { title: 'Chart', path: '/admin/charts', icon: faChartSimple },
    { title: 'User', path: '/admin/users', icon: faTable },
  ];

  return (
    <aside className="relative hidden h-screen w-64 bg-[#3d68ff] shadow-xl sm:block">
      <div className="p-6">
        <span className="text-3xl font-semibold uppercase text-white hover:text-gray-300">
          Welcome
        </span>
      </div>
      <nav className="pt-3 text-base font-semibold text-white">
        {items.map((i) => (
          <Link
            to={i.path}
            key={i.title}
            className="active-nav-link nav-item flex items-center py-4 pl-6 text-white"
          >
            <FontAwesomeIcon icon={i.icon} className="pr-2" /> {i.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default ASideLeft;
