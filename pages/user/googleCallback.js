import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/user';

export default function googleCallback() {
  const [error, setError] = useState();
  const router = useRouter();
  const { doGoogleCallback, user, setUser } = useContext(UserContext);
  useEffect(async () => {
    if (router.query.access_token) {
      const res = await doGoogleCallback({
        access_token: router.query.access_token,
      });
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

  return <p>Logging in with Google</p>;
}
