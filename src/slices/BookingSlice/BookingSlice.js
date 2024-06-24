import { createSlice } from "@reduxjs/toolkit";
import { FetchSearchThunk } from "./searchThunk";

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
      const exists = state.data.some(fav => fav.id === id);
      
      if (!exists) {
        const importDate = new Date().toLocaleDateString('en-GB');
        const descriptionToUse = description || alt_description;
        const newFav = { ...action.payload, importDate, description: descriptionToUse };
        state.data.push(newFav);
      }
    },
    deleteFav(state, action) {
      const index = state.data.findIndex(fav => fav.id === action.payload.id);
      if (index > -1) {
        state.data.splice(index, 1)
      }
    },
    updateFavDescription(state, action) {
      const index = state.data.findIndex(fav => fav.id === action.payload.id);
      if (index !== -1) {
        state.data[index].description = action.payload.description;
      } 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchSearchThunk.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(FetchSearchThunk.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.status = "fulfilled";
      state.data = [...state.data, data] 
  
    })
    .addCase(FetchSearchThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error
    })
}
})

export const {  } = BookingSlice.actions;
export const BookingSliceReducer = BookingSlice.reducer;