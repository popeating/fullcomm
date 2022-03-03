import React, { useState, useContext } from 'react';
import { useForm, reset } from 'react-hook-form';
import { UserContext } from '../context/user';

const ForgotForm = () => {
  const { doRemind } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(['', '']);
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const ret = await doRemind(values);
    if (ret[0] === 'alert') {
      setAlert(ret);
    } else {
      setAlert([
        '',
        `Please check your email (${values.email}) and follow the instructions to reset your password`,
      ]);
      reset();
    }
    setIsSubmitting(false);
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Forgot your password?</h1>
      <p className="mb-4">Insert your email address to reset your password</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            Email address
            <input
              type="email"
              className="mt-1 block w-full px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-slate-600"
              {...register('email', {
                required: 'Email is required',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              placeholder="you@email.com"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 rounded-md p-4 text-white text-xl text-bold uppercase disabled:bg-slate-200"
            disabled={isSubmitting}
          >
            {isSubmitting && 'Sending...'}
            {!isSubmitting && 'Send'}
          </button>
        </div>
        {alert[1]}
      </form>
    </main>
  );
};

export default ForgotForm;
