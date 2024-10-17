import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import PostList from '../features/post/components/PostList';
import ListFollowerAndFriendUser from '../features/friend/components/ListFollowerAndFriendUser';

export default function Home() {
  return (
    <div className="flex justify-center bg-[#f5f5f5] pt-[100px]">
      <div className="w-[15%]">
        <NavBar />
      </div>
      <div className="mx-5 flex h-[100vh] w-[50%] flex-col overflow-hidden border-solid border-l-zinc-400 bg-[#fff] px-[20px] py-[5px]">
        <div className="hide-scrollbar flex-1 overflow-y-auto">
          <PostList />
        </div>
      </div>
      <div className="w-[20%]">
        <ListFollowerAndFriendUser />
      </div>
    </div>
  );
}
