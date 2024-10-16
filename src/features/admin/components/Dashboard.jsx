import ASideLeft from './ASideLeft';
import AdminBarchart from './AdminBarChart';
import { useState, useEffect } from 'react';
import UserSection from './UserSection';
import adminService from '../services/admin';

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await adminService.getNewUserByYear(year);
      setData(data);
    })();
  }, [year]);

  return (
    <div className="flex">
      <ASideLeft />
      <div className="flex h-screen w-full flex-col overflow-y-hidden">
        <div className="flex w-full flex-col overflow-x-hidden border-t">
          <main className="w-full flex-grow p-6">
            <AdminBarchart data={data} />
            <UserSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
