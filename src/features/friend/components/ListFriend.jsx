import friendService from '../../friend/services/friend';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';

const ListFriend = () => {
  const dispatch = useDispatch();
  const { getFollowing, getWaiting, acceptFriendRequest, rejectFriendRequest } = friendService;
  const [suggestionList, setSuggestionList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hasSeenRequests, setHasSeenRequests] = useState(() => {
    // Lấy giá trị từ localStorage khi khởi tạo
    const saved = localStorage.getItem('hasSeenRequests');
    return saved === 'true'; // Chuyển đổi giá trị về boolean
  });

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await dispatch(getFollowing());
        setSuggestionList(response?.payload || []);
      } catch {
        setSuggestionList([]);
      }
    };

    fetchFollowing();
  }, [dispatch, getFollowing]);

  useEffect(() => {
    const fetchWaitingRequests = async () => {
      try {
        const response = await dispatch(getWaiting());
        setFriendRequests(response?.payload || []);
      } catch {
        setFriendRequests([]);
      }
    };

    fetchWaitingRequests();
  }, [dispatch, getWaiting]);

  const handleAccept = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xác nhận yêu cầu kết bạn này?')) {
      try {
        await dispatch(acceptFriendRequest(userId));
        setFriendRequests(friendRequests.filter(user => user.id !== userId));
        toast.success('Đã xác nhận yêu cầu kết bạn thành công!');
      } catch {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  const handleReject = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn từ chối yêu cầu kết bạn này?')) {
      try {
        await dispatch(rejectFriendRequest(userId));
        setFriendRequests(friendRequests.filter(user => user.id !== userId));
        toast.success('Đã từ chối yêu cầu kết bạn thành công!');
      } catch {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
    if (!showModal) {
      setHasSeenRequests(true); // Ẩn số lượng khi mở modal
      localStorage.setItem('hasSeenRequests', 'true'); // Lưu trạng thái vào localStorage
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
        <Link to={"/list-friend"} className="mt-4 p-2 ml-60 text-blue-600 rounded">
          Show all friend
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex-1">
        <h1 className="text-center text-xl font-bold mb-4 flex items-center justify-center">
          Người muốn kết bạn
          <div className="relative ml-2" onClick={toggleModal}>
            <div className="border-2 border-blue-600 rounded-full p-1 flex items-center justify-center">
              <FaUserPlus className="text-blue-600 text-xl" />
              {!hasSeenRequests && friendRequests.length > 0 && (
                <span className="mt-[4px] ml-[11px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">
                  {friendRequests.length}
                </span>
              )}
            </div>
          </div>
        </h1>
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
        <Link to={"/list-followers"} className="mt-4 p-2 ml-72 text-blue-600 rounded">Show all</Link>
      </div>

      {/* Modal hiển thị yêu cầu kết bạn */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Danh sách yêu cầu kết bạn:</h2>
            <ul>
              {friendRequests.map((user) => (
                <li key={user.id} className="flex items-center mb-4">
                  <Link to={`/profile/${user.id}`} className="flex items-center">
                    <img
                      src={user.profilePicture ? `/apihost/image/${user.profilePicture}` : ''}
                      className="h-14 w-14 rounded-full object-cover ml-24"
                      alt="Ảnh đại diện đã tải lên"
                    />
                    <span className="font-semibold ml-3">{user.name} đã gửi lời mời kết bạn</span>
                  </Link>
                  <div className='ml-3'>
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
                </li>
              ))}
            </ul>
            <button onClick={toggleModal} className="mt-4 bg-red-500 text-white p-2 rounded">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFriend;
