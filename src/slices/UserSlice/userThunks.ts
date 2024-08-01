import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, CreateUser } from '../../interfaces/user'
import { backendAPICall } from "../../utils/backendAPICall";

const ReadAllThunk = createAsyncThunk<User[], void>(
  "user/readAllThunk",
  async () => {
    return await backendAPICall('user');
  }
);

const ReadOneThunk = createAsyncThunk<User, string>(
  "user/readOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`);
  }
);

const CreateOneThunk = createAsyncThunk<User, CreateUser>(
  "user/createOneThunk",
  async (newUser: CreateUser) => {
    return await backendAPICall(`auth/newuser`, 'POST', newUser);
  }
);

const DeleteOneThunk = createAsyncThunk<string, string>(
  "user/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`, 'DELETE');
  }
);

const UpdateOneThunk = createAsyncThunk<User, { id: string, newUser: Partial<User> }>(
  "user/updateOneThunk",
  async ({ id, newUser }) => {
    return await backendAPICall(`user/${id}`, 'PUT', newUser);
  }
);

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk, UpdateOneThunk };
