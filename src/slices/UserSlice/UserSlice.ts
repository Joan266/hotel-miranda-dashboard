import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk } from './userThunks';
import { UserInterface } from '../../interfaces/user';

interface UserState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: UserInterface[];
  single: UserInterface | null;
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
      .addCase(readOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readOneThunk.fulfilled, (state, action: PayloadAction<UserInterface>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(readOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(readAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readAllThunk.fulfilled, (state, action: PayloadAction<{ users: UserInterface[] }>) => {
        state.status = 'fulfilled';
        state.items = action.payload.users;
        state.error = null;
      })
      .addCase(readAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOneThunk.fulfilled, (state, action: PayloadAction<UserInterface>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(createOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to create user';
      })
      .addCase(deleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(user => user._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to delete user';
      })
      .addCase(updateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneThunk.fulfilled, (state, action: PayloadAction<UserInterface>) => {
        state.status = 'fulfilled';
        state.items = state.items.map(user => user._id === action.payload._id ? action.payload : user);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(updateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to update user';
      });
  }
});

export const { reducer: UserSliceReducer } = UserSlice;
