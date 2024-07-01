import { createAsyncThunk } from "@reduxjs/toolkit";
import roomData from '../../data/rooms.json';

import { delayedRequest } from "../../utils/delayRequest";

const data =  roomData;

const ReadOneThunk = createAsyncThunk("room/readOneThunk", async (id) => {
  try {
    const response = await delayedRequest((data.find(room => room.id === id) || null), 500);
    return response;
  } catch (error) {
    return null; 
  }
});

const ReadAllThunk = createAsyncThunk("room/readAllThunk", async () => {
  try {
    return delayedRequest(data, 500);
  } catch (error) {
    return null;
  }
});

const CreateOneThunk = createAsyncThunk("room/createOneThunk", async (newRoom) => {
  try {
    const response = await delayedRequest(data, 500);
    return newRoom;
  } catch (error) {
    return null;
  }
});

const DeleteOneThunk = createAsyncThunk("room/deleteOneThunk", async (id) => {
  try {
    const response = await delayedRequest(data, 500);
    return id;
  } catch (error) {
    return null; 
  }
});

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk };
