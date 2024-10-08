import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Từ khóa tìm kiếm:', searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} method="post" className="flex pt-[80px]">
      <input
        type="text"
        placeholder="Search Posts..."
        className="ml-[120vh] w-[30%] border-collapse rounded-l-[30px] border-gray-400 bg-[#49586e] p-[9px_18px] text-[15px] text-white placeholder-gray-400 focus:border-transparent focus:outline-none"
      />
      <button className="border-collapse rounded-r-[30px] bg-[#49586e] pl-3 pr-3 text-white hover:bg-slate-500">
        <FontAwesomeIcon icon={faSearch} className="mr-2" />{' '}
      </button>
    </form>
  );
};

export default SearchForm;
