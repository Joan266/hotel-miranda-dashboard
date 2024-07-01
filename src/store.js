import { configureStore } from '@reduxjs/toolkit'
import { BookingSliceReducer } from './slices/BookingSlice/BookingSlice.js'
import { EmployeeSliceReducer } from './slices/EmployeeSlice/EmployeeSlice.js'
import { RoomSliceReducer } from './slices/RoomSlice/RoomSlice.js'
import { ReviewSliceReducer } from './slices/ReviewSlice/ReviewSlice.js'

export const store = configureStore({
  reducer: {
    booking: BookingSliceReducer,
    employee: EmployeeSliceReducer,
    room: RoomSliceReducer,
    review: ReviewSliceReducer,
  },
})