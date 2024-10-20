import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface ,UserFormInterface } from '../../interfaces/user'
import { backendAPICall } from "../../utils/backendAPICall";

const readAllThunk = createAsyncThunk<{ users: UserInterface[] }, void>(
  "user/readAllThunk",
  async () => {
    const data = await backendAPICall('user');
    return data;
  }
);

const readOneThunk = createAsyncThunk<UserInterface, string>(
  "user/readOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`);
  }
);

const createOneThunk = createAsyncThunk<UserInterface, UserFormInterface>(
  "user/createOneThunk",
  async (newUser: UserFormInterface) => {
    return await backendAPICall(`user/create`, 'POST', newUser);
  }
);

const deleteOneThunk = createAsyncThunk<string, string>(
  "user/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`, 'DELETE');
  }
);

const updateOneThunk = createAsyncThunk<UserInterface, { id: string, user: Partial<UserInterface> }>(
  "user/updateOneThunk",
  async ({ id, user }) => {
    return await backendAPICall(`user/${id}`, 'PUT', user);
  }
);

export { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk };
