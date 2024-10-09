import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/user';

const UserDetails = ({ currentUser }) => {
  const {
    user: { users },
    auth: { userData, token },
  } = useSelector((state) => state);

  const { unFollowUser } = userService;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="mb-4 ml-5 mt-8 flex w-10/12 justify-around">
      <div className="flex">
        <img
          src={currentUser?.profilePicture}
          className="h-12 w-12 cursor-pointer rounded-full"
          alt={`${currentUser?.username}`}
          onClick={() => navigate(`/profile/${currentUser?.username}`)}
        />

        <div className="flex w-40 flex-col px-2">
          <Link to={`/profile/${currentUser?.username}`}>
            <h2 className="font-semibold">{`${currentUser?.name}`}</h2>
          </Link>
        </div>
      </div>

      <button
        className="w-18 mt-1.5 h-8 rounded-xl bg-blue-600 px-3 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 hover:shadow-lg"
        onClick={() =>
          dispatch(unFollowUser({ followUserId: currentUser._id, token }))
        }
      >
        Unfollow
      </button>
    </div>
  );
};

export default UserDetails;
