import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UserAddIcon,
  LogoutIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { logoutUser } from '../api';
import { useGlobalContext } from '../context/Context';

function Header() {
  const { user, showSidebar, showUploadForm, dispatch } = useGlobalContext();

  console.log('User from context', user);
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await logoutUser();
      const { currentUser } = response;
      dispatch({
        type: 'SET_USER',
        payload: currentUser,
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadForm = (e) => {
    e.preventDefault();

    dispatch({
      type: 'SHOW_UPLOAD_FORM',
      payload: !showUploadForm,
    });
  };

  const handleSidebar = (e) => {
    e.preventDefault();

    dispatch({
      type: 'SHOW_SIDEBAR',
      payload: !showSidebar,
    });
  };

  return (
    <div className="flex justify-between h-14 px-5 ">
      <div className="flex justify-start w-1/4  p-3">
        <button onClick={handleSidebar} className="h-full w-28 mr-4 ">
          <MenuIcon className="h-6" />
        </button>

        <Link href="/">
          <a>
            <img className="h-full" src="youtube_logo.jpg" alt="" />
          </a>
        </Link>
      </div>

      <div className="flex justify-center items-center w-2/4 p-2">
        <form className="h-full w-3/4 flex justify-between border border-gray-300 pl-2">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full text-white outline-none"
          />
          <button className="bg-gray-100 p-3 w-16 flex justify-center">
            <SearchIcon className="h-full" />
          </button>
        </form>
      </div>

      <ul className="flex justify-end w-1/4 p-2">
        {!user ? (
          <>
            <li className="w-28 border border-blue-600 mx-2">
              <Link href="/auth/register">
                <a className="flex justify-center items-center h-full text-sm text-blue-600">
                  <UserAddIcon className="h-6 mr-2" />
                  <p className="uppercase">Register</p>
                </a>
              </Link>
            </li>
            <li className="w-28 border border-blue-600 mx-2">
              <Link href="/auth/login">
                <a className="flex justify-center items-center h-full text-sm text-blue-600">
                  <UserCircleIcon className="h-6 mr-2" />
                  <p className="uppercase">Sign In</p>
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="w-1/3 flex justify-center border border-blue-600 mx-2  bg-blue-600 hover:bg-blue-500 hover:border-none">
              <button
                onClick={handleUploadForm}
                className="flex justify-center items-center h-full text-sm text-white"
              >
                <VideoCameraIcon className="h-6 mr-2" />
                <p className="uppercase">Upload</p>
              </button>
            </li>
            <li className="w-1/3 flex justify-center border border-blue-600 mx-2">
              <Link href="/auth/login">
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center h-full text-sm text-blue-600"
                >
                  <LogoutIcon className="h-6 mr-2" />
                  <p className="uppercase">Sign out</p>
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
