import friendService from '../../friend/services/friend';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';

const ListFriend = () => {
  const dispatch = useDispatch();
  const { getFollowing, getWaiting, acceptFriendRequest, rejectFriendRequest } =
    friendService;
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
        setFriendRequests(friendRequests.filter((user) => user.id !== userId));
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
        setFriendRequests(friendRequests.filter((user) => user.id !== userId));
        toast.success('Đã từ chối yêu cầu kết bạn thành công!');
      } catch {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    if (!showModal) {
      setHasSeenRequests(true); // Ẩn số lượng khi mở modal
      localStorage.setItem('hasSeenRequests', 'true'); // Lưu trạng thái vào localStorage
    }
  };

  return (
    <div className="mb-10 flex h-full flex-col">
      {suggestionList.length > 0 ? (
        <div className="flex-1">
          <h1 className="mb-4 mt-6 text-center text-xl font-bold">
            Danh sách bạn bè
          </h1>
          <ul>
            {suggestionList.slice(0, 5).map((user) => (
              <li key={user.id} className="mb-72 flex items-center">
                <Link to={`/profile/${user.id}`} className="flex items-center">
                  <img
                    src={
                      user.profilePicture
                        ? `/apihost/image/${user.profilePicture}`
                        : ''
                    }
                    className="ml-24 h-14 w-14 rounded-full object-cover"
                    alt="Ảnh đại diện đã tải lên"
                  />
                  <span className="ml-3 font-semibold">{user.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={'/list-friend'}
            className="ml-52 mt-4 rounded p-2 text-blue-600"
          >
            Show all
          </Link>
        </div>
      ) : (
        <p>Không có bạn bè</p>
      )}

      <hr className="my-4" />

      {friendRequests.length > 0 ? (
        <div className="flex-1">
          <h1 className="mb-4 flex items-center justify-center text-center text-xl font-bold">
            Người muốn kết bạn
          </h1>
          <div className="relative ml-2" onClick={toggleModal}>
            <div className="flex items-center justify-center rounded-full border-2 border-blue-600 p-1">
              <FaUserPlus className="text-xl text-blue-600" />
              {!hasSeenRequests && friendRequests.length > 0 && (
                <span className="absolute left-1/2 top-0 ml-[11px] mt-[4px] flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {friendRequests.length}
                </span>
              )}
            </div>
          </div>
          <ul>
            {friendRequests.slice(0, 3).map((user) => (
              <li key={user.id} className="mb-4 flex items-center">
                <Link to={`/profile/${user.id}`} className="flex items-center">
                  <img
                    src={
                      user.profilePicture
                        ? `/apihost/image/${user.profilePicture}`
                        : ''
                    }
                    className="ml-24 h-14 w-14 rounded-full object-cover"
                    alt="Ảnh đại diện đã tải lên"
                  />
                </Link>
                <div className="ml-3">
                  <span className="ml-3 font-semibold hover:text-blue-800">
                    {user.name}
                  </span>
                  <div className="ml-3 mt-2">
                    <button
                      onClick={() => handleAccept(user.id)}
                      className="mr-2 w-20 rounded-lg bg-blue-600 p-2 text-xs text-white hover:bg-blue-700"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="w-20 rounded-lg bg-gray-300 p-2 text-xs text-black hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to={'/list-followers'}
            className="ml-52 mt-4 rounded p-2 text-blue-600"
          >
            Show all
          </Link>
        </div>
      ) : (
        <p>may ko co ban</p>
      )}

      {/* Modal hiển thị yêu cầu kết bạn */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-lg">
            <h2 className="mb-2 text-lg font-bold">
              Danh sách yêu cầu kết bạn:
            </h2>
            <ul>
              {friendRequests.map((user) => (
                <li key={user.id} className="mb-4 flex items-center">
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex items-center"
                  >
                    <img
                      src={
                        user.profilePicture
                          ? `/apihost/image/${user.profilePicture}`
                          : ''
                      }
                      className="ml-24 h-14 w-14 rounded-full object-cover"
                      alt="Ảnh đại diện đã tải lên"
                    />
                    <span className="ml-3 font-semibold">
                      {user.name} đã gửi lời mời kết bạn
                    </span>
                  </Link>
                  <div className="ml-3">
                    <button
                      onClick={() => handleAccept(user.id)}
                      className="mr-2 w-20 rounded-lg bg-blue-600 p-2 text-xs text-white hover:bg-blue-700"
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="w-20 rounded-lg bg-gray-300 p-2 text-xs text-black hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 rounded bg-red-500 p-2 text-white"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFriend;
