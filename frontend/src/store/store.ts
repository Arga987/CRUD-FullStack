import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import profilesReducer from '../features/profiles/profilesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    profiles: profilesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;