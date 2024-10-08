import { Outlet } from 'react-router-dom';
import ASideLeft from './ASideLeft';
import BarChart from './BarChart';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import UserTable from './UserTable';

const Dashboard = () => {
  const rawData = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  const data = {
    labels: rawData.map((d) => d.year),
    datasets: [
      {
        label: 'My Chart',
        data: rawData.map((d) => d.count),
        backgroundColor: ['rgba(75,192,192,1)'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const Layout = () => (
    <div className="flex">
      <ASideLeft />
      <div className="flex h-screen w-full flex-col overflow-y-hidden">
        <div className="flex w-full flex-col overflow-x-hidden border-t">
          <main className="w-full flex-grow p-6">
            {/* <Outlet /> */}
            <BarChart data={data} />
            <UserTable />
          </main>
        </div>
      </div>
    </div>
  );

  return <Layout />;
};

export default Dashboard;
