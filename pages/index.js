import Link from 'next/link';
import { useEffect, useContext } from 'react';

import { UserContext } from '../context/user';
import GoogleLogin from '../components/GoogleLogin';
import FacebookLogin from '../components/FacebookLogin';

export default function Home({ orders }) {
  const { user, checkLogin } = useContext(UserContext);
  useEffect(async () => {
    const res = await checkLogin();
    if (res.status === 200) {
    }
  }, []);
  if (user) {
    useRouter.push('/user');
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl">Welcome</h1>

      <Link href="/user/login" passHref>
        <button>Login</button>
      </Link>
      <Link href="/user/register" passHref>
        <button>Register</button>
      </Link>
      <GoogleLogin />
      <FacebookLogin />
    </div>
  );
}
