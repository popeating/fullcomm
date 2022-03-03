import React, { useEffect, useContext } from 'react';

import useRouter from 'next/router';
import { UserContext } from '../../context/user';

import LoginForm from '../../components/LoginForm';

function Login() {
  const { user, jwt, setUser, checkLogin } = useContext(UserContext);

  useEffect(async () => {
    const res = await checkLogin();
    if (res.status === 200) {
      setUser(res.data);
    }
  }, []);
  if (user) {
    useRouter.push('/user');
  }
  return <LoginForm />;
}

export default Login;
