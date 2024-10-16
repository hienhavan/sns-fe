import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ value, onChange, placeholder, type = 'text' }) => {
  return (
    <div className="ml-0 flex max-w-md overflow-hidden border-b border-[#333] bg-white px-4 py-3 font-[sans-serif] focus-within:border-blue-500">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        className="w-full pl-1 text-sm outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
