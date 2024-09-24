"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProfile, updateProfile } from '../features/profiles/profilesSlice';
import { useRouter } from 'next/router';
import { AppDispatch } from '../store/store';

interface ProfileFormProps {
  profileId?: number;
  existingProfile?: {
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileId, existingProfile }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: existingProfile || {
      email: '',
      gender: '',
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const onSubmit = (data: {
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }) => {
    if (profileId) {
      dispatch(updateProfile({ id: profileId, profile: data }));
    } else {
      dispatch(createProfile({ ...data, userId: 1 })); // Adjust userId as needed
    }
    reset();
    router.push('/profiles'); // Redirect to profile list after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register('email')} />
      </div>
      <div>
        <label>Gender:</label>
        <input {...register('gender')} />
      </div>
      <div>
        <label>Address:</label>
        <input {...register('address')} />
      </div>
      <div>
        <label>Pincode:</label>
        <input {...register('pincode')} />
      </div>
      <div>
        <label>City:</label>
        <input {...register('city')} />
      </div>
      <div>
        <label>State:</label>
        <input {...register('state')} />
      </div>
      <div>
        <label>Country:</label>
        <input {...register('country')} />
      </div>
      <button type="submit">{profileId ? 'Update Profile' : 'Create Profile'}</button>
    </form>
  );
};

export default ProfileForm;
