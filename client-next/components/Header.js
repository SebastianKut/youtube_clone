import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/solid';
import { logoutUser } from '../api';
import { useGlobalContext } from '../context/Context';
import SubmitModal from './SubmitModal';

function Header() {
  const { user, dispatch } = useGlobalContext();

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

  return (
    <div className="flex justify-between h-14">
      <div className="flex justify-start w-1/4  p-3">
        <button className="h-full w-28 mr-4 ">
          <MenuIcon className="h-full" />
        </button>

        <Link href="/">
          <a>
            <img className="h-full" src="youtube_logo.jpg" alt="" />
          </a>
        </Link>
      </div>

      <div className="flex justify-center items-center w-2/4 p-2">
        <form className="h-full w-3/4 flex justify-between border border-gray-400 pl-2">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full text-white outline-none"
          />
          <button className="bg-gray-300 p-3 w-16 flex justify-center">
            <SearchIcon className="h-full" />
          </button>
        </form>
      </div>

      <ul className="flex w-1/4 p-4">
        {!user ? (
          <>
            <li className="w-full">
              <Link href="/auth/login">
                <a className="flex justify-end h-full w-full w-1/2">
                  <UserCircleIcon />
                  <p>Register</p>
                </a>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/auth/login">
                <a className="flex justify-end h-full w-1/2">
                  <UserCircleIcon />
                  <p>Sign In</p>
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <SubmitModal />
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
