import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk } from './reviewThunks';
import { ReviewInterface } from "../../interfaces/review";
interface ReviewState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: ReviewInterface[];
  single: ReviewInterface | null;
  error: string | null;
}


const initialState: ReviewState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const ReviewSlice = createSlice({
  name: 'Review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readOneThunk.fulfilled, (state, action: PayloadAction<ReviewInterface>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(readOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch review';
      })
      .addCase(readAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readAllThunk.fulfilled, (state, action: PayloadAction<{ reviews: ReviewInterface[] }>) => {
        state.status = 'fulfilled';
        state.items = action.payload.reviews;
        state.error = null;
      })
      .addCase(readAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to fetch reviews";
      })
      .addCase(createOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOneThunk.fulfilled, (state, action: PayloadAction<ReviewInterface>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(createOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to create review";
      })
      .addCase(deleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to delete review";
      })
      .addCase(updateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneThunk.fulfilled, (state, action: PayloadAction<ReviewInterface>) => {
        state.status = 'fulfilled';
        state.items = state.items.map(review => review._id === action.payload._id ? action.payload : review);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(updateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to update review';
      });
  }
});


export const { reducer: ReviewSliceReducer } = ReviewSlice;