import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk } from './reviewThunks';

interface Review {
  id: string;
  order_id: string;
  review_date: {
    text: string;
    date: string;
  };
  comment: string;
  rating: number;
  customer_name: string;
}

interface ReviewState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: Review[];
  single: Review | null;
  error: string | null;
}

const initialState: ReviewState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action: PayloadAction<Review | null>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'error';
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(ReadAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'error';
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(CreateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action: PayloadAction<Review>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'error';
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(DeleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'error';
        state.error = action.payload ?? "Unknown error";
      });
  }
});

export const ReviewSliceReducer = ReviewSlice.reducer;
