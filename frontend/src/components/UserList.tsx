"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';
import { useRouter } from 'next/router';

const UserList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    // Fetch users on component mount
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    // Navigate to the edit user form
    router.push(`/users/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => router.push('/users/create')}>Create User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.phone}
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
