import { useEffect, useState } from 'react';
import friendService from '../../friend/services/friend';
import { Link } from 'react-router-dom';
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

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="flex flex-col h-[820px] mx-5 overflow-hidden">
                <div className="flex-1 overflow-y-auto mx-auto flex flex-col items-center gap-8 hide-scrollbar">
                    <h1 className="mt-6 text-center text-xl font-bold">Danh sách bạn bè</h1>
                    <div className="grid grid-cols-4 gap-6 mx-auto">
                        {suggestionList.map((friend) => (
                            <div key={friend.id} className="border rounded-lg flex flex-col w-64 h-80">
                                <div className="h-1/3 bg-gray-200">
                                    <img
                                        src="../../../../public/login_img.jpg" // Ảnh bìa mặc định
                                        className="w-full h-full object-cover"
                                        alt="Ảnh bìa"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center h-2/3 p-4 relative">
                                    <img
                                        src={friend.profilePicture ? `/apihost/image/${friend.profilePicture}` : '../../../../public/logo_img.png'}
                                        className="h-20 w-20 rounded-full border-2 border-white absolute top-0 transform -translate-y-1/2"
                                        alt="Ảnh đại diện"
                                    />
                                    <div className="mt-12 flex flex-col items-center">
                                        <span className="font-semibold text-lg">{friend.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllListFriend;
