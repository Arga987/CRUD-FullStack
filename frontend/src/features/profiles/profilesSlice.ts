// src/features/profiles/profilesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
interface Profile {
  id: number;
  userId: number;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

interface ProfilesState {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
  const response = await axios.get('/api/profiles');
  return response.data;
});

export const createProfile = createAsyncThunk(
  'profiles/createProfile',
  async (profile: {
    userId: number;
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }) => {
    const response = await axios.post('/api/profiles', profile);
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  'profiles/updateProfile',
  async ({ id, profile }: { id: number; profile: Omit<Profile, 'id' | 'userId'> }) => {
    const response = await axios.patch(`/api/profiles/${id}`, profile);
    return response.data;
  }
);

export const deleteProfile = createAsyncThunk('profiles/deleteProfile', async (id: number) => {
  await axios.delete(`/api/profiles/${id}`);
  return id;
});

// Slice
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profiles';
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex((profile) => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter((profile) => profile.id !== action.payload);
      });
  },
});

export default profilesSlice.reducer;
