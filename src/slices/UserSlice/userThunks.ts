import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, CreateUser } from '../../interfaces/user'
import { backendAPICall } from "../../utils/backendAPICall";

const readAllThunk = createAsyncThunk<{ users: User[] }, void>(
  "user/readAllThunk",
  async () => {
    const data = await backendAPICall('user');
    return data.users;
  }
);

const readOneThunk = createAsyncThunk<User, string>(
  "user/readOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`);
  }
);

const createOneThunk = createAsyncThunk<User, CreateUser>(
  "user/createOneThunk",
  async (newUser: CreateUser) => {
    return await backendAPICall(`auth/newuser`, 'POST', newUser);
  }
);

const deleteOneThunk = createAsyncThunk<string, string>(
  "user/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`user/${id}`, 'DELETE');
  }
);

const updateOneThunk = createAsyncThunk<User, { id: string, newUser: Partial<User> }>(
  "user/updateOneThunk",
  async ({ id, newUser }) => {
    return await backendAPICall(`user/${id}`, 'PUT', newUser);
  }
);

export { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk };
