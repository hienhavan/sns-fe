import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const UserFilter = ({ filter, onChange }) => {
  return (
    <div className="ml-0 flex max-w-md overflow-hidden border-b border-[#333] bg-white px-4 py-3 font-[sans-serif] focus-within:border-blue-500">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type="filter"
        placeholder="Search Something..."
        className="w-full pl-1 text-sm outline-none"
        value={filter}
        onChange={onChange}
      />
    </div>
  );
};

export default UserFilter;
