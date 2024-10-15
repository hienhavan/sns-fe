import { useEffect, useState } from 'react';
import NavBar from '../../../components/NavBar';
import UserPost from '../../post/components/UserPost';
import userService from '../../user/services/user';
import { Link } from 'react-router-dom';
import ListFreind from './ListFriend';
import { getUserFromLocalStorage } from '../../../utils/axiosClient';

const Profile = () => {
  const storedUser = getUserFromLocalStorage();
  const id = storedUser ? storedUser.id : null;
  const { getUser } = userService;
  const [user, setUser] = useState({
    name: '',
    email: '',
    profile_picture: '',
    biography: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getUser(id);
          setUser({
            profilePicture: response.profilePicture || '',
            name: response.name || '',
            biography: response.biography || '',
          });
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    };
    fetchData();
  }, [id, getUser]);

  return (
    <div className="space-between flex justify-center pt-[100px]">
      <div className="w-[20%]">
        <NavBar />
      </div>
      <div className="mx-5 flex h-[820px] flex-col overflow-hidden">
        <header className="m-4 hidden w-full justify-between sm:flex">
          <h1 className="text-xl">Profile</h1>
        </header>
        <div
          className="hide-scrollbar mx-auto flex flex-1 flex-col items-center gap-8 overflow-y-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
                            .hide-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}
          </style>
          <div className="flex items-center">
            <img
              src={
                user.profilePicture
                  ? `/apihost/image/${user.profilePicture}`
                  : ''
              }
              className="h-32 w-32 rounded-full object-cover"
              alt="profile_picture"
            />
            <div className="ml-8">
              <h2 className="mb-4 ml-1 font-semibold">{user.name}</h2>
              <Link
                to="/update-profile"
                className="text-x mt-4 cursor-pointer rounded-lg border bg-slate-200 p-1 text-center font-semibold text-slate-600 hover:bg-slate-100"
              >
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h2 className="font-semibold">{user.biography}</h2>
          </div>
          <div className="mx-auto mb-16 mt-4 flex justify-center gap-6 pl-4">
            <h3 className="cursor-pointer text-base sm:text-xl">
              <span className="text-base text-slate-600 sm:text-xl">
                10 post
              </span>
            </h3>
            <h3 className="cursor-pointer text-base sm:text-xl">
              <span className="pl-1 text-slate-600">10 following</span>
            </h3>
            <h3 className="cursor-pointer text-base sm:text-xl">
              <span className="pl-1 text-slate-600">10 followers</span>
            </h3>
          </div>
          <UserPost />
        </div>
      </div>
      <div className="w-[20%]">
        <ListFreind />
      </div>
    </div>
  );
};

export default Profile;
