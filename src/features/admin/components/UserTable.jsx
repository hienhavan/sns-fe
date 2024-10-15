import { useState } from 'react';
import UserFilter from './UserFilter';
import { useEffect } from 'react';
import adminService from '../services/admin';
import { useCallback } from 'react';
import { debounce } from 'lodash';

const UserTable = () => {
  const [filter, setFilter] = useState('');
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setUsers(adminService.filterUser());
  // }, []);

  const users = [
    {
      id: 1,
      username: 'Jon Do',
      email: 'test@email1',
      isActive: true,
    },
    {
      id: 2,
      username: 'Alan Walk',
      email: 'test@email2',
      isActive: true,
    },
    {
      id: 3,
      username: 'Eliz Bath',
      email: 'test@email3',
      isActive: false,
    },
  ];

  const filterDebounce = useCallback(
    debounce(adminService.filterUser, 500),
    [],
  );

  const banDebounce = useCallback(debounce((adminService.blockUser, 500)), []);

  const handleOnFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleOnActiveChange = (e) => {};

  const theads = ['Username', 'Email', 'Status'];

  return (
    <div className="mt-12 w-full">
      <p className="flex items-center pb-3 text-xl">
        <UserFilter
          filter={filter}
          handleOnFilterChange={handleOnFilterChange}
        />
      </p>
      <div className="overflow-auto bg-white">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-800 text-white">
            <tr>
              {theads.map((el) => (
                <th
                  key={el}
                  className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-full w-full rounded-full"
                        src={user.image ? user.image : null}
                        alt={user.username}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="whitespace-no-wrap text-gray-900">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">
                    {user.email}
                  </p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <label className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={user.isActive}
                      />
                      <div className="peer flex h-6 w-11 items-center rounded-full bg-gray-300 after:absolute after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#007bff] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
