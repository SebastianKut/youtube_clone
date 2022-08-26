import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { registerUser } from '../../api';
import { useGlobalContext } from '../../context/Context';
import useRequest from '../../hooks/useRequest';

function RegisterPage() {
  const { user } = useGlobalContext();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  const { sendRequest, errors } = useRequest({
    requestFunction: registerUser,
    data: formData,
    onSuccess: () => {
      router.push('/auth/login');
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className="w-full flex flex-col items-center p-12">
      <h1 className="block text-gray-700 text-lg font-bold mb-2">
        Register your new account
      </h1>
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            value={formData.username}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            value={formData.confirmPassword}
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            type="submit"
          >
            Register
          </button>
          <a
            className="inline-block align-baseline  text-xs text-blue-500 hover:text-blue-800"
            href="#"
          >
            Already have an account? - Login
          </a>
        </div>
      </form>
      {errors}
    </div>
  );
}

export default RegisterPage;
