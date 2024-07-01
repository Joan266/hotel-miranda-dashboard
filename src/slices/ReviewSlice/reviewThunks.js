import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewData from '../../data/reviews.json';

import { delayedRequest } from "../../utils/delayRequest";

const data =  reviewData;

const ReadOneThunk = createAsyncThunk("review/readOneThunk", async (id) => {
  try {
    const response = await delayedRequest((data.find(review => review.id === id) || null), 500);
    return response;
  } catch (error) {
    return null; 
  }
});

const ReadAllThunk = createAsyncThunk("review/readAllThunk", async () => {
  try {
    return delayedRequest(data, 500);
  } catch (error) {
    return null;
  }
});

const CreateOneThunk = createAsyncThunk("review/createOneThunk", async (newreview) => {
  try {
    const response = await delayedRequest(data, 500);
    return newreview;
  } catch (error) {
    return null;
  }
});

const DeleteOneThunk = createAsyncThunk("review/deleteOneThunk", async (id) => {
  try {
    const response = await delayedRequest(data, 500);
    return id;
  } catch (error) {
    return null; 
  }
});

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk };
