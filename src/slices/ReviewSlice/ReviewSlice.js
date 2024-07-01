import { createSlice } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk } from './reviewThunks';

const ReviewSlice = createSlice({
  name: 'review',
  initialState: {
    status: "idle",
    items: [],
    single: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(ReadAllThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(CreateOneThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(DeleteOneThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item.id !== action.payload)
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export const ReviewSliceReducer = ReviewSlice.reducer;
