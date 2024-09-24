"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../features/users/usersSlice';
import { useRouter } from 'next/router';
import { AppDispatch } from '../store/store';

interface UserFormProps {
  userId?: number;
  existingUser?: {
    username: string;
    phone: string;
  };
}

const UserForm: React.FC<UserFormProps> = ({ userId, existingUser }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: existingUser || { username: '', phone: '' },
  });

  const onSubmit = (data: { username: string; phone: string }) => {
    if (userId) {
      dispatch(updateUser({ id: userId, user: data }));
    } else {
      dispatch(createUser(data));
    }
    reset();
    router.push('/users'); // Redirect to user list after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input {...register('username')} />
      </div>
      <div>
        <label>Phone:</label>
        <input {...register('phone')} />
      </div>
      <button type="submit">{userId ? 'Update User' : 'Create User'}</button>
    </form>
  );
};

export default UserForm;
