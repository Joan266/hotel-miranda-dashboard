import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookings.json';
import { delayedRequest } from "../../utils/delayRequest";

interface Booking {
  id: string;
  first_name: string;
  last_name: string;
  order_date: {
    date: string;
    time: string;
    datetime: string;
  };
  check_in: {
    date: string;
    time: string;
    datetime: string;
  };
  check_out: {
    date: string;
    time: string;
    datetime: string;
  };
  room_type: string;
  status: string;
}

const data: Booking[] = bookingsData as Booking[];

const ReadOneThunk = createAsyncThunk<Booking | null, string>(
  "booking/readOneThunk",
  async (id) => {
    try {
      const response = await delayedRequest(
        data.find((booking) => booking.id === id) || null,
        500
      );
      return response;
    } catch (error) {
      return null;
    }
  }
);

const ReadAllThunk = createAsyncThunk<Booking[], void>(
  "booking/readAllThunk",
  async () => {
    try {
      const response = await delayedRequest(data, 500);
      return response;
    } catch (error) {
      return [];
    }
  }
);

const CreateOneThunk = createAsyncThunk<Booking | null, Booking>(
  "booking/createOneThunk",
  async (newBooking) => {
    try {
      const response = await delayedRequest(data, 500);
      return newBooking;
    } catch (error) {
      return null;
    }
  }
);

const DeleteOneThunk = createAsyncThunk<number | null, number>(
  "booking/deleteOneThunk",
  async (id) => {
    try {
      const response = await delayedRequest(data, 500);
      return id;
    } catch (error) {
      return null;
    }
  }
);

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk };
