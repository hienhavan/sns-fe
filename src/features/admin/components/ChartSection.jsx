import { useEffect, useState, Suspense } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import AdminBarChart from './AdminBarChart';
import SearchBar from './SearchBar';
import ChartSkeleton from './ChartSkeleton';
import adminService from '../services/admin';

const ChartSection = () => {
  const [data, setData] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [debouncedYear] = useDebounce(year, 500);

  useEffect(() => {
    (async () => {
      const data = await adminService.getNewUserByYear(debouncedYear);
      setData(data);
    })();
  }, [debouncedYear]);

  const onChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      toast.warn('Please enter a number!', {
        position: 'top-right',
        autoClose: 1000,
      });
    } else {
      setYear(value);
    }
  };

  return (
    <>
      <div className="flex items-center pb-3 text-xl">
        <SearchBar
          value={year}
          onChange={onChange}
          placeholder={'enter a years...'}
        />
      </div>
      <Suspense fallback={<ChartSkeleton />}>
        <AdminBarChart data={data} />
      </Suspense>
    </>
  );
};

export default ChartSection;
