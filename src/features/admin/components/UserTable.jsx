const UserTable = () => {
  const theads = ['Firstname', 'LastName', 'Email'];
  const users = [
    {
      firstname: 'test',
      lastname: 'test lastname',
      email: 'test@email1',
    },
    {
      firstname: 'test',
      lastname: 'test lastname',
      email: 'test@email2',
    },
    {
      firstname: 'test',
      lastname: 'test lastname',
      email: 'test@email3',
    },
  ];
  return (
    <div className="mt-6 w-full">
      <p className="flex items-center pb-3 text-xl">User table</p>
      <div className="overflow-auto bg-white">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {theads.map((el) => (
                <th
                  key={el}
                  className="w-1/3 px-4 py-3 text-left text-sm font-semibold uppercase"
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((el) => (
              <tr key={el.email}>
                <td className="w-1/3 px-4 py-3 text-left">{el.firstname}</td>
                <td className="w-1/3 px-4 py-3 text-left">{el.lastname}</td>
                <td className="w-1/3 px-4 py-3 text-left">{el.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
