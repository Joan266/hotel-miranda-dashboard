import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk } from './employeesThunks';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  join_date: {
    text: string;
    date: string;
  };
  job_desk: string;
  schedule: {
    days: string;
    hours: string;
  };
  status: boolean;
}

interface EmployeeState {
  status: 'idle' | 'loading' | 'fulfilled' | 'error';
  items: Employee[];
  single: Employee | null;
  error: string | null;
}

const initialState: EmployeeState = {
  status: "idle",
  items: [],
  single: null,
  error: null,
};

const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ReadOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadOneThunk.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.status = 'fulfilled';
        state.single = action.payload;
        state.error = null;
      })
      .addCase(ReadOneThunk.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'error';
        state.error = action.payload.message;
      })
      .addCase(ReadAllThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReadAllThunk.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(ReadAllThunk.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'error';
        state.error = action.payload.message;
      })
      .addCase(CreateOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOneThunk.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
        state.single = action.payload;
        state.error = null;
      })
      .addCase(CreateOneThunk.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'error';
        state.error = action.payload.message;
      })
      .addCase(DeleteOneThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteOneThunk.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'fulfilled';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(DeleteOneThunk.rejected, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'error';
        state.error = action.payload.message;
      });
  }
});

export const { reducer: EmployeeSliceReducer } = EmployeeSlice;
