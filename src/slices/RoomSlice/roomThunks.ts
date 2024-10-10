import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface, RoomFormInterface } from '../../interfaces/rooms'
import { backendAPICall } from "../../utils/backendAPICall";

const readAllThunk = createAsyncThunk<{ users: RoomInterface[] }, void>(
  "room/readAllThunk",
  async () => {
    const data = await backendAPICall('room');
    return data.rooms;
  }
);

const readOneThunk = createAsyncThunk<RoomInterface, string>(
  "room/readOneThunk",
  async (id) => {
    return await backendAPICall(`room/${id}`);
  }
);

const createOneThunk = createAsyncThunk<RoomInterface, RoomFormInterface>(
  "user/createOneThunk",
  async (newRoom: RoomFormInterface) => {
    return await backendAPICall(`room/create`, 'POST', newRoom);
  }
);

const deleteOneThunk = createAsyncThunk<string, string>(
  "room/deleteOneThunk",
  async (id) => {
    return await backendAPICall(`room/${id}`, 'DELETE');
  }
);

const updateOneThunk = createAsyncThunk<RoomInterface, { id: string, room: Partial<RoomInterface> }>(
  "room/updateOneThunk",
  async ({ id, room }) => {
    return await backendAPICall(`room/${id}`, 'PUT', room);
  }
);

export { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk };
