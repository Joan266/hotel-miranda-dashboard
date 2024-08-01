import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import roomData from '../../data/rooms.json';

import { delayedRequest } from "../../utils/delayRequest";

interface Room {
  id: string;
  room_type: string;
  bed_type: string;
  floor_room: string;
  facilities: string[];
  rate: number;
  status: "available" | "booked";
}

const data: Room[] = roomData as Room[];

const ReadOneThunk = createAsyncThunk<Room | null, string>(
  "room/readOneThunk",
  async (id) => {
    try {
      const response = await delayedRequest(
        data.find(room => room.id === id) || null,
        500
      );
      return response;
    } catch (error) {
      return null;
    }
  }
);

const ReadAllThunk = createAsyncThunk<Room[], void>(
  "room/readAllThunk",
  async () => {
    try {
      return delayedRequest(data, 500);
    } catch (error) {
      return [];
    }
  }
);

const CreateOneThunk = createAsyncThunk<Room | null, Room>(
  "room/createOneThunk",
  async (newRoom) => {
    try {
      const response = await delayedRequest(data, 500);
      return newRoom;
    } catch (error) {
      return null;
    }
  }
);

const DeleteOneThunk = createAsyncThunk<string | null, string>(
  "room/deleteOneThunk",
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
