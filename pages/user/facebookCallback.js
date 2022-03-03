import { useRouter } from 'next/router';
import cookie from 'cookie';
import axios from '../../lib/api';
import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/user';

export default function facebookCallback() {
  const [error, setError] = useState();
  const router = useRouter();
  const { doFacebookCallback, user, setUser } = useContext(UserContext);
  useEffect(async () => {
    if (router.query.access_token) {
      const res = await doFacebookCallback({
        access_token: router.query.access_token,
      });
      //   console.log(res);
      if (res[0] === 'alert') {
        setError(res[1]);
      }
      setUser(res[1].username);
    }
  }, [router]);
  if (user) {
    router.push('/user');
  }
  if (error) {
    router.push(`/user?msg=${error}`);
  }

  return <p>Logging in with Facebook</p>;
}
