import NavBar from './NavBar';
import PostList from '../features/post/components/PostList';
import ListFreind from '../features/friend/components/ListFriend';

export default function Home() {
  return (
    <div className="grid grid-cols-1 justify-center gap-4 bg-[#f5f5f5] pt-[100px] md:grid-cols-12">
      <div className="col-span-2 col-start-1 hidden w-full md:col-span-2 md:col-start-2 md:inline-block">
        <NavBar />
      </div>
      <div className="col-span-5 mx-2 h-[100vh] w-full overflow-hidden border-solid border-l-zinc-400 bg-white">
        <div className="hide-scrollbar flex-1 overflow-y-auto">
          <PostList />
        </div>
      </div>
      <div className="col-span-2 col-end-11 hidden w-full md:block">
        <ListFreind />
      </div>
    </div>
  );
}
