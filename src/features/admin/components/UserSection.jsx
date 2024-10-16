import UserTable from './UserTable';
import { useState, useEffect } from 'react';
import adminService from '../services/admin';
import UserFilter from './UserFilter';

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    (async () => {
      const data = await adminService.filterUser();
      setUsers(data);
    })();
  }, []);

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center pb-3 text-xl">
        <UserFilter filter={filter} />
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
