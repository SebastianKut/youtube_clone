import Link from 'next/link';
import { useRouter } from 'next/router';
import { logoutUser } from '../api';
import { useGlobalContext } from '../context/Context';

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
    <div className="bg-gray-500">
      <div>Welcome {user?.username}</div>
      <div>
        <ul>
          {!user ? (
            <>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button>Upload Video</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
