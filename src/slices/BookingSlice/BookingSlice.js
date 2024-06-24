import { createSlice } from "@reduxjs/toolkit";
import { FetchBookingThunk } from "./bookingThunk";

const BookingSlice = createSlice({
  name: 'booking',
  initialState: {
    status: "idle",
    rooms: [],
    error: null,
    room: {
      id:Number,
      first_name:String,
      last_name:String,
      room_id:Number,
      order_date: Date,
      check_in: Date,
      check_out: Date,
      status: String,
    }
  },
  reducers: {
    addBooking(state, action) {
      const { first_name, last_name, room_id, order_date, check_in, check_out } = action.payload;
 

    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchBookingThunk.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(FetchBookingThunk.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.status = "fulfilled";
      state.data = [...state.data, data] 
  
    })
    .addCase(FetchBookingThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const {  } = BookingSlice.actions;
export const BookingSliceReducer = BookingSlice.reducer;