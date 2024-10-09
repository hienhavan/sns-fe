import { AiOutlineCamera } from 'react-icons/ai';
import UserPost from '../../post/components/UserPost';
import userService from '../services/user';
import { useEffect, useState } from 'react';
import NavBar from '../../../../src/components/NavBar';
import { Link } from 'react-router-dom';
import ListFreind from './ListFriend';

const Profile = () => {
  const { getUser } = userService;
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    profile_picture: '',
    biography: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(1);
        setUser(response);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="space-between flex justify-center pt-[100px]">
      <div className="w-[20%]">
        <NavBar />
      </div>
      <div className="space-between flex flex-col sm:ml-5">
        <header className="m-4 hidden w-full justify-between sm:flex">
          <h1 className="text-xl">Profile</h1>
        </header>
        <div className="mx-auto flex gap-8">
          <div className="relative">
            <img
              src={'../../../../public/login_img.jpg'}
              className="h-32 w-32 rounded-full"
              alt="profile_picture"
              name="profile_picture"
            />
            <label className="absolute bottom-[0.25rem] right-[0.25rem] h-8 w-8 cursor-pointer rounded-full border-2 border-white bg-slate-200 fill-blue-600 stroke-0 p-1 text-2xl hover:bg-slate-300">
              <input className="hidden" type="file" accept="image/*" />
              <AiOutlineCamera className="size-5" />
            </label>
          </div>
          <div className="mt-2 flex flex-col">
            <h2 className="font-semibold">
              {' '}
              {user.firstname} {user.lastname} Hcheng dev
            </h2>
            <h2 className="font-semibold text-blue-600">email@gmail.com</h2>
            <Link
              to="/update-profile"
              className="text-x my-3 cursor-pointer rounded-lg border bg-slate-200 p-1 text-center font-semibold text-slate-600 hover:bg-slate-100"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="font-semibold">Đẹp trai có gì sai!</h2>
        </div>
        <div className="mx-auto mb-16 mt-4 flex justify-items-center gap-6 pl-4">
          <h3 className="cursor-pointer text-base sm:text-xl">
            <span className="text-base text-slate-600 sm:text-xl">10 post</span>
          </h3>
          <h3 className="cursor-pointer text-base sm:text-xl">
            <span className="pl-1 text-slate-600">10 following</span>
          </h3>
          <h3 className="cursor-pointer text-base sm:text-xl">
            {}
            <span className="pl-1 text-slate-600">10 followers</span>
          </h3>
        </div>
        <UserPost />
      </div>
      <div className="w-[20%]">
        <ListFreind />
      </div>
    </div>
  );
};

export default Profile;
