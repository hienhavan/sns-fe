const ChartSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow md:p-6 dark:border-gray-700"
    >
      <div className="mb-2.5 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-10 h-2 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 flex items-baseline">
        <div className="h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-56 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-64 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ChartSkeleton;
