import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  readOneThunk, 
  readAllThunk, 
  createOneThunk, 
  deleteOneThunk, 
  updateOneThunk 
} from './bookingThunks';
import { BookingInterface } from "../../interfaces/bookings";

interface BookingState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: BookingInterface[];
  single: BookingInterface | null;
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
      // Handle readOneThunk
      .addCase(readOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null; 
      })
      .addCase(readOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch booking';
      })
      
      // Handle readAllThunk
      .addCase(readAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readAllThunk.fulfilled, (state, action: PayloadAction<{ bookings: BookingInterface[] }>) => {
        state.status = 'fulfilled';
        state.items = action.payload.bookings; 
        state.error = null; 
      })
      .addCase(readAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to fetch bookings";
      })

      // Handle createOneThunk
      .addCase(createOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload); 
        state.single = action.payload; 
        state.error = null; 
      })
      .addCase(createOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to create booking";
      })

      // Handle deleteOneThunk
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
        state.error = action.error.message || "Failed to delete booking";
      })

      // Handle updateOneThunk
      .addCase(updateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface>) => {
        state.status = 'fulfilled';
        state.items = state.items.map(booking => 
          booking._id === action.payload._id ? action.payload : booking
        );
        state.single = action.payload; 
        state.error = null;
      })
      .addCase(updateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to update booking';
      });
  }
});

export const { reducer: BookingSliceReducer } = BookingSlice;
