import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import userService from '../../user/services/user';

const SearchForm = () => {
  const { getUsers } = userService;
  const [listUser, setListUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setListUser([]);
      return;
    }

    try {
      const data = await getUsers({ name: searchQuery });

      setListUser(data);
    } catch (error) {
      //   console.error('Lỗi khi tìm kiếm người dùng:', error);
      setListUser([]);
    }
  };

  return (
    <div className="col-span-3 col-start-1">
      <form onSubmit={handleSubmit} method="POST" className="flex w-full">
        <input
          type="text"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-collapse rounded-l-[30px] border-gray-400 bg-[#49586e] p-[9px_18px] text-[15px] text-white placeholder-gray-400 focus:border-transparent focus:outline-none"
        />
        <button
          type="submit"
          className="border-collapse rounded-r-[30px] bg-[#49586e] pl-3 pr-3 text-white hover:bg-slate-500"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
        </button>
      </form>

      {searchQuery && listUser.length > 0 && (
        <ul className="absolute z-10 mt-2 w-[80%] rounded border bg-white shadow-lg">
          {listUser.map((user) => (
            <li key={user.id} className="p-2 hover:bg-gray-200">
              {user.name}
            </li>
          ))}
        </ul>
      )}
      {/* {searchQuery && listUser.length === 0 && (
        <div className="text-gray-500">Không tìm thấy người dùng nào.</div>
      )} */}
    </div>
  );
};

export default SearchForm;
