import { useEffect, useState } from 'react';
import friendService from '../../friend/services/friend';
import { useDispatch } from 'react-redux';

const AllListFriend = () => {
    const dispatch = useDispatch();
    const { getFollowing } = friendService;
    const [suggestionList, setSuggestionList] = useState([]);

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

    const handleProfileClick = (id) => {
        alert('ID của người bạn:' + id);
    };

    return (
        <div className="flex justify-center pt-[100px] bg-gray-100 min-h-screen">
            <div className="flex flex-col h-auto mx-5 overflow-hidden bg-white rounded-lg shadow-xl p-6">
                <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">Danh sách bạn bè</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {suggestionList.map((friend) => (
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllListFriend;
