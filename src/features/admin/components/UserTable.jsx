import { useState } from 'react';
import adminService from '../services/admin';
import { toast } from 'react-toastify';

const UserRow = ({ user }) => {
  const [active, setActive] = useState(user.active);
  const [isDisable, setIsDisable] = useState(false);

  const onChange = (e) => {
    setActive(e.target.checked);
    setIsDisable(true);
    adminService
      .blockUser(user)
      .then((updated) => {
        toast.success(`${active ? 'block' : 'unblock'} ${updated.username}`);
        setActive(updated.active);
        setIsDisable(false);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err);
      });
  };

  return (
    <tr key={user.id}>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src={user.profilePicture ? user.profilePicture : null}
              alt={user.name}
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{user.email}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={active}
              onChange={onChange}
              disabled={isDisable}
            />
            <div className="peer flex h-6 w-11 items-center rounded-full bg-gray-300 after:absolute after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-[#007bff] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </td>
    </tr>
  );
};

const UserTable = ({ users }) => {
  const theads = ['User', 'Email', 'Status'];

  return (
    <div className="overflow-auto bg-white">
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-800 text-white">
          <tr>
            {theads.map((thead) => (
              <th
                key={thead}
                className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
