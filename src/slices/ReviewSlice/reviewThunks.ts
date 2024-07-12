import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewData from '../../data/reviews.json';

import { delayedRequest } from "../../utils/delayRequest";

interface Review {
  id: string;
  order_id: string;
  review_date: {
    text: string;
    date: string;
  };
  comment: string;
  rating: number;
  customer_name: string;
}

const data: Review[] = reviewData as Review[];

const ReadOneThunk = createAsyncThunk<Review | null, string>(
  "review/readOneThunk",
  async (id) => {
    try {
      const response = await delayedRequest(
        data.find(review => review.id === id) || null,
        500
      );
      return response;
    } catch (error) {
      return null;
    }
  }
);

const ReadAllThunk = createAsyncThunk<Review[], void>(
  "review/readAllThunk",
  async () => {
    try {
      return delayedRequest(data, 500);
    } catch (error) {
      return [];
    }
  }
);

const CreateOneThunk = createAsyncThunk<Review | null, Review>(
  "review/createOneThunk",
  async (newReview) => {
    try {
      const response = await delayedRequest(data, 500);
      return newReview;
    } catch (error) {
      return null;
    }
  }
);

const DeleteOneThunk = createAsyncThunk<string | null, string>(
  "review/deleteOneThunk",
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
