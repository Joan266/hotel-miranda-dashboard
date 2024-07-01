import { configureStore } from '@reduxjs/toolkit'
import { BookingSliceReducer } from './slices/BookingSlice/BookingSlice.js'
import { EmployeeSliceReducer } from './slices/EmployeeSlice/EmployeeSlice.js'

export const store = configureStore({
  reducer: {
    booking: BookingSliceReducer,
    employee: EmployeeSliceReducer,
  },
})