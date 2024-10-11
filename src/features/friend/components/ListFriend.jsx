import friendService from '../../friend/services/friend';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ListFriend = () => {
  const dispatch = useDispatch();
  const { getFollowing, getWaiting, acceptFriendRequest, rejectFriendRequest } = friendService;
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

  useEffect(() => {
    const fetchWaitingRequests = async () => {
      try {
        const response = await dispatch(getWaiting());

        if (response && response.payload) {
          setFriendRequests(response.payload);
        } else {
          console.error('Dữ liệu không hợp lệ:', response);
          setFriendRequests([]);
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu yêu cầu kết bạn:', err);
        setFriendRequests([]);
      }
    };

    fetchWaitingRequests();
  }, [dispatch, getWaiting]);

  const handleAccept = async (userId) => {
    try {
      await dispatch(acceptFriendRequest(userId));
      setFriendRequests(friendRequests.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Lỗi khi xác nhận yêu cầu kết bạn:', err);
    }
  };

  const handleReject = async (userId) => {
    try {
      await dispatch(rejectFriendRequest(userId));
      setFriendRequests(friendRequests.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Lỗi khi hủy yêu cầu kết bạn:', err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h1 className="mt-6 text-center text-xl font-bold mb-4">Danh sách bạn bè</h1>
        <ul>
          {suggestionList.slice(0, 5).map((user) => (
            <li key={user.id} className="flex items-center mb-4">
              <Link to={`/profile/${user.id}`} className="flex items-center">
                <img
                  src={user.profilePicture ? `/apihost/image/${user.profilePicture}` : ''}
                  className="h-14 w-14 rounded-full object-cover ml-24"
                  alt="Ảnh đại diện đã tải lên"
                />
                <span className="font-semibold ml-3">{user.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={"/list-freind"} className="mt-4 p-2 ml-60 text-blue-600 rounded">
          Show all friend
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex-1">
        <h1 className=" text-center text-xl font-bold mb-4">Người muốn kết bạn</h1>
        <ul>
          {friendRequests.slice(0, 3).map((user) => (
            <li key={user.id} className="flex items-center mb-4">
              <Link to={`/profile/${user.id}`} className="flex items-center">
                <img
                  src={user.profilePicture ? `/apihost/image/${user.profilePicture}` : ''}
                  className="h-14 w-14 rounded-full object-cover ml-24"
                  alt="Ảnh đại diện đã tải lên"
                />
              </Link>
              <div className='ml-3'>
                <span className="font-semibold ml-3 hover:text-blue-800">{user.name}</span>
                <div className="ml-3 mt-2">
                  <button
                    onClick={() => handleAccept(user.id)}
                    className="mr-2 w-20 text-xs rounded-lg p-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => handleReject(user.id)}
                    className="p-2 w-20 text-xs bg-gray-300 rounded-lg hover:bg-gray-400 text-black"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link className="mt-4 p-2 ml-72 text-blue-600 rounded">Show all</Link>
      </div>
    </div>
  );
};

export default ListFriend;
