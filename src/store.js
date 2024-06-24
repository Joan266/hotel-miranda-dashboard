import { configureStore } from '@reduxjs/toolkit'
import { BookingSliceReducer } from './slices/BookingSlice/BookingSlice.js'
export const store = configureStore({
  reducer: {
    booking: BookingSliceReducer,
  },
})