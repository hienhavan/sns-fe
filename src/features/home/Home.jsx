import { useEffect, useState } from 'react';
import NavBar from '../../../src/components/NavBar';
import PostList from '../../../src/features/post/components/PostList';

export default function Home() {
  // TODO: is this needed?
  return (
    <div className="space-between flex justify-center pt-[100px]">
      <div className="w-[20%]">
        <NavBar />
      </div>
      <div className="space-between flex flex-col sm:ml-5">
        <PostList />
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
}
