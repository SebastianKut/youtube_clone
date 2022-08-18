import Link from 'next/link';
import { useGlobalContext } from '../context/Context';

function Header() {
  const { user } = useGlobalContext();
  console.log('User from context', user);
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
            <li>
              <button>Upload Video</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
