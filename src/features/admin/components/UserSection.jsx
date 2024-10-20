import UserTable from './UserTable';
import { useState, useEffect, Suspense } from 'react';
import adminService from '../services/admin';
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';
import TableSkeleton from './TableSkeleton';

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
        <SearchBar
          value={filter}
          onChange={onChange}
          placeholder={'Search users...'}
        />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        {users.length > 0 ? (
          <UserTable users={users} />
        ) : (
          <p>No available users</p>
        )}
      </Suspense>
    </div>
  );
};

export default UserSection;
