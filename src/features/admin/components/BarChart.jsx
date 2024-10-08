import { Bar } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';

const BarChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="mt-6 flex h-[400px] w-[600px] flex-wrap">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
