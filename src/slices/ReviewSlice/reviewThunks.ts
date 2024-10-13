import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReviewInterface, ReviewFormInterface } from '../../interfaces/review'
import { backendAPICall } from "../../utils/backendAPICall";

const readAllThunk = createAsyncThunk<{ reviews: ReviewInterface[] }, void>(
  "review/readAllThunk",
  async () => {
    const data = await backendAPICall('review');
    return data.reviews;
  }
);

const readOneThunk = createAsyncThunk<ReviewInterface, string>(
  "review/readOneThunk",
  async (id) => {
    return await backendAPICall(`review/${id}`);
  }
);

const createOneThunk = createAsyncThunk<ReviewInterface, ReviewFormInterface>(
  "review/createOneThunk",
  async (newReview: ReviewFormInterface) => {
    return await backendAPICall(`review/create`, 'POST', newReview);
  }
);

const deleteOneThunk = createAsyncThunk<string, string>(
  "review/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`review/${id}`, 'DELETE');
  }
);

const updateOneThunk = createAsyncThunk<ReviewInterface, { id: string, review: Partial<ReviewInterface> }>(
  "review/updateOneThunk",
  async ({ id, review }) => {
    return await backendAPICall(`review/${id}`, 'PUT', review);
  }
);

export { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk };
