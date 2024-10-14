import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface, BookingFormInterface } from '../../interfaces/bookings'
import { backendAPICall } from "../../utils/backendAPICall";

const readAllThunk = createAsyncThunk<{ bookings: BookingInterface[] }, void>(
  "booking/readAllThunk",
  async () => {
    const data = await backendAPICall('booking');
    return data.bookings;
  }
);

const readOneThunk = createAsyncThunk<BookingInterface, string>(
  "booking/readOneThunk",
  async (id) => {
    return await backendAPICall(`booking/${id}`);
  }
);

const createOneThunk = createAsyncThunk<BookingInterface, BookingFormInterface>(
  "booking/createOneThunk",
  async (newBooking: BookingFormInterface) => {
    return await backendAPICall(`booking/create`, 'POST', newBooking);
  }
);

const deleteOneThunk = createAsyncThunk<string, string>(
  "booking/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`booking/${id}`, 'DELETE');
  }
);

const updateOneThunk = createAsyncThunk<BookingInterface, { id: string, booking: Partial<BookingInterface> }>(
  "booking/updateOneThunk",
  async ({ id, booking }) => {
    return await backendAPICall(`booking/${id}`, 'PUT', booking);
  }
);

export { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk };
