import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/user';

function LoginForm() {
  const { handleSubmit, register } = useForm();

  const [alert, setAlert] = useState(['', '']);

  const { setUser, doLogin, loggingIn, setLoggingIn } = useContext(UserContext);

  const onSubmit = async (values) => {
    setLoggingIn(true);
    const ret = await doLogin(values);

    if (ret[0] == 'alert') {
      setAlert(ret);
    } else {
      setUser(ret.message.username);
    }
    setLoggingIn(false);
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            Username or Email
            <input
              autoComplete="username"
              type="text"
              className="mt-1 block w-full px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-slate-600"
              {...register('identifier', {
                required: true,
              })}
            />
          </label>

          <label className="block ">
            Password
            <input
              autoComplete="current-password"
              type="password"
              {...register('password', {
                required: true,
              })}
              className="mt-1 block w-full px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-slate-600"
            />
          </label>

          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 rounded-md p-4 text-white text-xl text-bold uppercase disabled:bg-slate-200"
            disabled={loggingIn}
          >
            {loggingIn && 'Logging in...'}
            {!loggingIn && 'Login'}
          </button>
        </div>
        {alert[1]}
      </form>
      <div>
        <a href="/user/forgotpassword">Forgot password?</a>
      </div>
    </main>
  );
}

export default LoginForm;
