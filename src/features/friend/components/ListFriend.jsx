import friendService from '../../friend/services/friend'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ListFriend = () => {
  const dispatch = useDispatch();
  const { getFollowing } = friendService;
  const [suggestionList, setSuggestionList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await dispatch(getFollowing());

        if (response && response.payload) {
          setSuggestionList(response.payload);
        } else {
          console.error('Dữ liệu không hợp lệ:', response);
          setSuggestionList([]);
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu người theo dõi:', err);
        setSuggestionList([]);
      }
    };

    fetchFollowing();
  }, [dispatch, getFollowing]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="mt-6 text-center text-xl font-bold">Danh sách bạn bè</h1>
        <ul>
          {suggestionList.slice(0, 5).map((user) => (
            <li key={user.id} className="flex items-center mb-4">
              <Link to={`/profile/${user.id}`} className="flex items-center">
                <img
                  src={user.profilePicture ? `/apihost/image/${user.profilePicture}` : ''}
                  className="h-16 w-16 rounded-full object-cover ml-24"
                  alt="Ảnh đại diện đã tải lên"
                />
                <span className="font-semibold ml-3">{user.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={"/list-freind"}
          className="mt-4 p-2 ml-60 text-blue-600 rounded"
        >Show all friend
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex-1">
        <h1 className="mt-6 text-center text-xl font-bold">Người muốn kết bạn</h1>
        <ul>
          {friendRequests.slice(0, 4).map((user) => (
            <li key={user.id} className="flex items-center mb-4">
              <Link to={`/profile/${user.id}`} className="flex items-center">
                <img
                  src={user.profilePicture ? `/apihost/image/${user.profilePicture}` : ''}
                  className="h-16 w-16 rounded-full object-cover ml-24"
                  alt="Ảnh đại diện đã tải lên"
                />
                <span className="font-semibold ml-3">{user.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="mt-4 p-2 ml-72 text-blue-600 rounded"
        >show all
        </Link>
      </div>
    </div>
  );
};

export default ListFriend;
