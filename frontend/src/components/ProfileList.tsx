"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchProfiles, deleteProfile } from '../features/profiles/profilesSlice';
import { useRouter } from 'next/router';

const ProfileList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const profiles = useSelector((state: RootState) => state.profiles.profiles);

  useEffect(() => {
    // Fetch profiles on component mount
    dispatch(fetchProfiles());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    // Navigate to the edit profile form
    router.push(`/profiles/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      dispatch(deleteProfile(id));
    }
  };

  return (
    <div>
      <h1>Profile List</h1>
      <button onClick={() => router.push('/profiles/create')}>Create Profile</button>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.email} - {profile.city}
            <button onClick={() => handleEdit(profile.id)}>Edit</button>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
