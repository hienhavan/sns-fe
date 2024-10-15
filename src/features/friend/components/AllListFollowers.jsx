import { useEffect, useState } from 'react';
import friendService from '../../friend/services/friend';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AllListFollowers = () => {
    const dispatch = useDispatch();
    const { getWaiting, rejectFriendRequest, acceptFriendRequest } = friendService;
    const [friendRequests, setFriendRequests] = useState([]);

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

    const handleProfileClick = (id) => {
        alert('ID của người dùng:' + id);
    };

    const handleReject = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn từ chối yêu cầu kết bạn này?')) {
            try {
                await dispatch(rejectFriendRequest(userId));
                setFriendRequests(friendRequests.filter(user => user.id !== userId));
                toast.success('Đã từ chối yêu cầu kết bạn thành công!');
            } catch (err) {
                console.error('Lỗi khi hủy yêu cầu kết bạn:', err);
                toast.error('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    const handleAcceptFriendRequest = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xác nhận kết bạn với người này?')) {
            try {
                await dispatch(acceptFriendRequest(id));
                setFriendRequests((prevRequests) => prevRequests.filter(friend => friend.id !== id));
                toast.success('Đã xác nhận yêu cầu kết bạn thành công!');
            } catch (err) {
                console.error('Lỗi khi xác nhận yêu cầu:', err);
                toast.error('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="flex justify-center pt-[100px] bg-gray-100 min-h-screen">
            <div className="flex flex-col h-auto mx-5 overflow-hidden bg-white rounded-lg shadow-2xl p-6">
                <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">Người muốn kết bạn</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {friendRequests.map((friend) => (
                        <div key={friend.id} className="rounded-lg flex flex-col w-64 h-80 transition-transform transform hover:scale-100 hover:shadow-xl border border-gray-300 bg-gray-50 relative">
                            <div className="h-1/3 bg-gray-200 rounded-t-lg overflow-hidden shadow-md">
                                <img
                                    src="../../../../public/login_img.jpg"
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    alt="Ảnh bìa"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center h-2/3 p-4 relative">
                                <img
                                    src={friend.profilePicture ? `/apihost/image/${friend.profilePicture}` : '../../../../public/logo_img.png'}
                                    className="h-28 w-28 rounded-full border-4 border-white shadow-lg absolute -top-14 transition-transform duration-300 hover:scale-105"
                                    alt="Ảnh đại diện"
                                    onClick={() => handleProfileClick(friend.id)}
                                />
                                <div className="mt-16 flex flex-col items-center">
                                    <span className="font-semibold text-lg text-gray-800">{friend.name}</span>
                                    <span className="text-sm text-gray-600">{friend.email}</span>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            className="bg-blue-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                                            onClick={() => handleAcceptFriendRequest(friend.id)}
                                        >
                                            Kết bạn
                                        </button>
                                        <button
                                            className="p-2 w-20 text-xs bg-gray-300 rounded-lg hover:bg-gray-400 text-black"
                                            onClick={() => handleReject(friend.id)}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllListFollowers;
