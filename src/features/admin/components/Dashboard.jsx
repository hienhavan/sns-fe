import ASideLeft from './ASideLeft';
import UserSection from './UserSection';
import ChartSection from './ChartSection';

const Dashboard = () => {
  return (
    <div className="flex">
      <ASideLeft />
      <div className="flex h-screen w-full flex-col overflow-y-hidden">
        <div className="flex w-full flex-col overflow-x-hidden border-t">
          <main className="w-full flex-grow p-6">
            <ChartSection />
            <UserSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
