import React, { useState, useContext } from 'react';
import { useForm, reset, set } from 'react-hook-form';
import { UserContext } from '../context/user';
import { useRouter } from 'next/router';

const ResetForm = () => {
  const { push, query } = useRouter();
  const { doReset } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = {};
  password.current = watch('password', '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(['', '']);
  const onSubmit = async (values) => {
    values.code = query.code;
    setIsSubmitting(true);
    const ret = await doReset(values);
    if (ret[0] === 'alert') {
      setAlert(ret);
    } else {
      setAlert([
        '',
        `Your password has been changed, you will be redirect to login`,
      ]);
      setTimeout(() => {
        push('/user/login');
      }, 3000);
      reset();
    }
    setIsSubmitting(false);
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Update your password</h1>
      <p className="mb-4">Type and confirm a new password</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className="grid grid-cols-1 gap-6">
          <label className="block ">
            Password
            <input
              type="password"
              {...register('password', {
                required: 'You must specify a password',
                minLength: { value: 8, message: 'At least 8 character' },
              })}
              className="mt-1 block w-full px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-slate-600"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <label className="block">
            Password confirmation
            <input
              type="password"
              {...register('passwordConfirmation', {
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
              className="mt-1 block w-full px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-slate-600"
            />
            {errors.passwordConfirmation && (
              <p>{errors.passwordConfirmation.message}</p>
            )}
          </label>
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 rounded-md p-4 text-white text-xl text-bold uppercase disabled:bg-slate-200"
            disabled={isSubmitting}
          >
            {isSubmitting && 'Sending...'}
            {!isSubmitting && 'Update Password'}
          </button>
        </div>
        {alert[1]}
      </form>
    </main>
  );
};

export default ResetForm;
