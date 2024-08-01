import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk } from './bookingThunks';

interface BookingItem {
  id: string;
  first_name: string;
  last_name: string;
  order_date: {
    date: string;
    time: string;
    datetime: string;
  };
  check_in: {
    date: string;
    time: string;
    datetime: string;
  };
  check_out: {
    date: string;
    time: string;
    datetime: string;
  };
  room_type: string;
  status: string;
}

interface BookingState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: BookingItem[];
  single: BookingItem | null;
  error: string | null;
}

const initialState: BookingState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'error';
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(ReadAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'error';
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(CreateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'error';
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(DeleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'error';
        state.error = action.error?.message ?? 'Unknown error';
      });
  }
});

export const BookingSliceReducer = BookingSlice.reducer;