import UserTable from './UserTable';
import { useState, useEffect } from 'react';
import adminService from '../services/admin';
import UserFilter from './UserFilter';
import { useDebounce } from 'use-debounce';

const UserSection = () => {
  const [filter, setFilter] = useState('');
  const [debounceFilter] = useDebounce(filter, 500);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await adminService.filterUser(debounceFilter);
      setUsers(data);
    })();
  }, [debounceFilter]);

  const onChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center pb-3 text-xl">
        <UserFilter filter={filter} onChange={onChange} />
      </div>
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <p>No available users</p>
      )}
    </div>
  );
};

export default UserSection;
