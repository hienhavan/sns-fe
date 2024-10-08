import { useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';
import Modal from 'react-responsive-modal';

const PostForm = () => {
  const [postImage, setPostImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  return (
    <div
      style={{
        modal: {
          width: '20rem',
          height: 'fit-content',
          paddingTop: '0.2rem',
          borderRadius: '1rem',
          margin: '0 auto',
        },
        overlay: { backgroundColor: 'rgba(0,0,0,0.1)' },
      }}
      className=""
    >
      <div className="flex justify-end">
        {/*<button className="text-lg font-semibold">x</button>*/}
      </div>

      <div className="flex py-3">
        <div className="mt-3 h-12 w-12 flex-none text-lg">
          <img
            src="/public/logo_img.png"
            className="h-12 w-12 flex-none rounded-full"
            alt="avatar"
          />
        </div>

        <div className="w-full px-2">
          <textarea
            placeholder="Bạn đang nghĩ gì?"
            className="mt-3 h-28 w-full resize-none rounded-xl bg-slate-100 p-2 pb-3 focus:outline-none"
          ></textarea>

          <div className="mx-auto max-h-80 max-w-xl rounded-md">
            {postImage && (
              <img
                src={URL.createObjectURL(postImage)}
                className="my-2 block max-h-20 max-w-full cursor-pointer rounded-md"
                alt="postImage"
              />
            )}
          </div>

          <div className="flex justify-between">
            <label className="m-2 flex">
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <BsFillImageFill className="mt-1 cursor-pointer text-2xl text-blue-700" />
            </label>
            <button className="rounded-xl bg-blue-600 p-2.5 pt-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg disabled:cursor-not-allowed">
              Đăng Bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
