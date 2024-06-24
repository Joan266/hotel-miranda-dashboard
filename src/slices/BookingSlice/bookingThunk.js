import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookings.json';

const request = {
  data: bookingsData,
  ok: true,
  error: null,
};

export const FetchBookingThunk = createAsyncThunk("booking/fetchBookingThunk", async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (request.ok) {
          resolve(request.data);
        } else {
          reject(new Error("Request failed"));
        }
      }, 500); 
    });
  } catch (error) {
    return null;
  }
});
