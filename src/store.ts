import { configureStore } from '@reduxjs/toolkit';
import { BookingSliceReducer } from './slices/BookingSlice/BookingSlice';
import { UserSliceReducer } from './slices/UserSlice/UserSlice';
import { RoomSliceReducer } from './slices/RoomSlice/RoomSlice';
import { ReviewSliceReducer } from './slices/ReviewSlice/ReviewSlice';

export const store = configureStore({
  reducer: {
    booking: BookingSliceReducer,
    user: UserSliceReducer,
    room: RoomSliceReducer,
    review: ReviewSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;