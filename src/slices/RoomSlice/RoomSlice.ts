import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readOneThunk, readAllThunk, createOneThunk, deleteOneThunk, updateOneThunk } from './roomThunks';
import { RoomInterface, RoomFormInterface } from "../../interfaces/rooms";
interface RoomState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: RoomInterface[];
  single: RoomInterface | null;
  error: string | null;
}


const initialState: RoomState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const RoomSlice = createSlice({
  name: 'Room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(readOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch room';
      })
      .addCase(readAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readAllThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(readAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to fetch rooms";
      })
      .addCase(createOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(createOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to create room";
      })
      .addCase(deleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || "Failed to delete room";
      })
      .addCase(updateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface>) => {
        state.status = 'fulfilled';
        state.items = state.items.map(room => room._id === action.payload._id ? action.payload : room);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(updateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to update user';
      });
  }
});


export const { reducer: RoomSliceReducer } = RoomSlice;