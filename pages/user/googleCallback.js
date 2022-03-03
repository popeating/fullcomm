import { useRouter } from 'next/router';
import cookie from 'cookie';
import axios from '../../lib/api';
import { useEffect, useContext } from 'react';

import { UserContext } from '../../context/user';

export default function googleCallback() {
  const router = useRouter();
  const { doGoogleCallback, user, setUser } = useContext(UserContext);
  useEffect(async () => {
    if (router.query.access_token) {
      const res = await doGoogleCallback({
        access_token: router.query.access_token,
      });
      setUser(res[1].username);
    }
  }, [router]);
  if (user) {
    router.push('/user');
  }

  return <p>Logging in with Google</p>;
}
