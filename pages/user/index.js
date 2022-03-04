import Logout from '../../components/Logout';
import Link from 'next/link';
import { useEffect, useContext } from 'react';

import { UserContext } from '../../context/user';
import GoogleLogin from '../../components/GoogleLogin';
import FacebookLogin from '../../components/FacebookLogin';

import { useRouter } from 'next/router';

export default function Home() {
  const { user, email, id, checkLogin } = useContext(UserContext);
  const { query } = useRouter();
  const error = query.msg;
  useEffect(async () => {
    const res = await checkLogin();
    if (res.status === 200) {
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl">Welcome</h1>
      {error && <div>{error}</div>}
      {user && (
        <>
          <div>
            <p>
              {id} - {user} {email}
              <br />
            </p>
          </div>
          <Logout />
        </>
      )}
      {!user && (
        <>
          <Link href="/user/login" passHref>
            <button>Login</button>
          </Link>
          <Link href="/user/register" passHref>
            <button>Register</button>
          </Link>
          <GoogleLogin />
          <FacebookLogin />
        </>
      )}
    </div>
  );
}
