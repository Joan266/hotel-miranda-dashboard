import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk, UpdateOneThunk } from './userThunks';
import { User } from '../../interfaces/user';

interface UserState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: User[];
  single: User | null;
  error: string | null;
}

const initialState: UserState = {
  status: 'idle',
  items: [],
  single: null,
  error: null,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(ReadAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(CreateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to create user';
      })
      .addCase(DeleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(user => user._id !== action.payload);
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to delete user';
      })
      .addCase(UpdateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateOneThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled';
        state.items = state.items.map(user => user._id === action.payload._id ? action.payload : user);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(UpdateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to update user';
      });
  }
});

export const { reducer: UserSliceReducer } = UserSlice;
