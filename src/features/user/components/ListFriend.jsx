import userService from '../services/user';
import UserDetails from './UserDetails';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ListFreind = () => {
  const dispatch = useDispatch();

  const { getFollowing } = userService;
  const [suggestionList, setSuggestionList] = useState([]);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await dispatch(getFollowing()).unwrap();
        setSuggestionList(response);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu người theo dõi:', err);
      }
    };
    fetchFollowing();
  }, [dispatch, getFollowing]);
  return (
    <div>
      <h1 className="mt-6 text-center text-xl font-bold">Following</h1>
      <ul className="">
        {suggestionList.map((user) => (
          <UserDetails key={user._id} currentUser={user} />
        ))}
      </ul>
    </div>
  );
};

export default ListFreind;
