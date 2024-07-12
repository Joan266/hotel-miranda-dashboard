import { configureStore } from '@reduxjs/toolkit';
import {BookingSliceReducer} from './slices/BookingSlice/BookingSlice';
import {EmployeeSliceReducer} from './slices/EmployeeSlice/EmployeeSlice';
import {RoomSliceReducer} from './slices/RoomSlice/RoomSlice';
import {ReviewSliceReducer} from './slices/ReviewSlice/ReviewSlice';

export const store = configureStore({
  reducer: {
    booking: BookingSliceReducer,
    employee: EmployeeSliceReducer,
    room: RoomSliceReducer,
    review: ReviewSliceReducer,
  },
});