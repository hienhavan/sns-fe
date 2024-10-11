import { useEffect, useState } from 'react';
import NavBar from '../../../src/components/NavBar';
import PostList from '../../../src/features/post/components/PostList';
import ListFreind from '../friend/components/ListFriend';

export default function Home() {
  return (
    <div className="flex justify-center pt-[100px]">
      <div className="w-[20%]">
        <NavBar />
      </div>
      <div className="flex flex-col overflow-hidden h-[820px] mx-5">
        <div
          className="flex-1 overflow-y-auto hide-scrollbar"
          style={{
            scrollbarWidth: 'none', // Ẩn thanh cuộn trong Firefox
            msOverflowStyle: 'none', // Ẩn thanh cuộn trong Internet Explorer và Edge
          }}
        >
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none; // Ẩn thanh cuộn trong Chrome, Safari và Edge
              }
            `}
          </style>
          <PostList />
        </div>
      </div>
      <div className="w-[20%]">
        <ListFreind />
      </div>
    </div>
  );
}
