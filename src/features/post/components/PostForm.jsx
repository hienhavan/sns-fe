import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import Modal from "react-responsive-modal";

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
                    width: "20rem",
                    height: "fit-content",
                    paddingTop: "0.2rem",
                    borderRadius: "1rem",
                    margin: "0 auto",
                },
                overlay: { backgroundColor: "rgba(0,0,0,0.1)" },
            }}
            className="pt-20"
        >
            <div className="flex justify-end">
                {/*<button className="text-lg font-semibold">x</button>*/}
            </div>

            <div className="flex py-3">
                <div className="mt-3 w-12 h-12 text-lg flex-none">
                    <img
                        src="/public/logo_img.png"
                        className="flex-none w-12 h-12 rounded-full"
                        alt="avatar"
                    />
                </div>

                <div className="w-full px-2">
          <textarea
              placeholder="Bạn đang nghĩ gì?"
              className="resize-none mt-3 pb-3 w-full h-28 bg-slate-100 focus:outline-none rounded-xl p-2"
          ></textarea>

                    <div className="max-w-xl max-h-80 mx-auto rounded-md">
                        {postImage && (
                            <img
                                src={URL.createObjectURL(postImage)}
                                className="block max-w-full max-h-20 rounded-md my-2 cursor-pointer"
                                alt="postImage"
                            />
                        )}
                    </div>

                    <div className="flex justify-between">
                        <label className="flex m-2">
                            <input
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <BsFillImageFill className="text-2xl mt-1 text-blue-700 cursor-pointer" />
                        </label>
                        <button
                            className="disabled:cursor-not-allowed p-2.5 pt-3 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                        >
                          Đăng Bài
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
