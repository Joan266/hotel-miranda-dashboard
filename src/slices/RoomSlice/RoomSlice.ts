import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk } from './roomThunks';

interface Room {
  id: string;
  room_type: string;
  bed_type: string;
  floor_room: string;
  facilities: string[];
  rate: number;
  status: "available" | "booked" ;
}

interface RoomState {
  status: "idle" | "loading" | "fulfilled" | "error";
  items: Room[];
  single: Room | null;
  error: string | null;
}

const initialState: RoomState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearRoomState(state) {
      state.status = 'idle';
      state.items = [];
      state.single = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action: PayloadAction<Room | null>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? "Failed to fetch room";
      })
      .addCase(ReadAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? "Failed to fetch rooms";
      })
      .addCase(CreateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? "Failed to create room";
      })
      .addCase(DeleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'fulfilled';
        state.items = state.items.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? "Failed to delete room";
      });
  }
});

export const { clearRoomState } = RoomSlice.actions;

export const RoomSliceReducer = RoomSlice.reducer;
