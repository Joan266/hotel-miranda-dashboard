import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookings.json';

import { delayedRequest } from "../../utils/delayRequest";

const data =  bookingsData;

const ReadOneThunk = createAsyncThunk("booking/readOneThunk", async (id) => {
  try {
    const response = await delayedRequest((data.find(booking => booking.id === id) || null), 500);
    return response;
  } catch (error) {
    return null; 
  }
});

const ReadAllThunk = createAsyncThunk("booking/readAllThunk", async () => {
  try {
    return delayedRequest(data, 500);
  } catch (error) {
    return null;
  }
});

const CreateOneThunk = createAsyncThunk("booking/createOneThunk", async (newBooking) => {
  try {
    const response = await delayedRequest([...data, newBooking], 500);
    return response;
  } catch (error) {
    return null;
  }
});

const DeleteOneThunk = createAsyncThunk("booking/deleteOneThunk", async (id) => {
  try {
    const response = await delayedRequest(data.filter(booking => booking.id !== id), 500);
    return response;
  } catch (error) {
    return null; 
  }
});

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk };
