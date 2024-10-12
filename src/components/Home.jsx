import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import PostList from '../features/post/components/PostList';
import ListFreind from '../features/friend/components/ListFriend';

export default function Home() {
  return (
    <div className="flex justify-center pt-[100px] bg-[#f5f5f5]">
      <div className="w-[15%]">
        <NavBar />
      </div>
      <div className="flex flex-col overflow-hidden h-[100vh] mx-5 border-solid border-l-zinc-400 bg-[#fff] px-[20px] py-[5px] w-[50%]">
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <PostList />
        </div>
      </div>
      <div className="w-[20%]">
        <ListFreind />
      </div>
    </div>
  );
}
