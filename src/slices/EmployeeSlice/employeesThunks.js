import { createAsyncThunk } from "@reduxjs/toolkit";
import employeesData from '../../data/employees.json';

import { delayedRequest } from "../../utils/delayRequest";

const data =  employeesData;

const ReadOneThunk = createAsyncThunk("employee/readOneThunk", async (id) => {
  try {
    const response = await delayedRequest((data.find(employee => employee.id === id) || null), 500);
    return response;
  } catch (error) {
    return null; 
  }
});

const ReadAllThunk = createAsyncThunk("employee/readAllThunk", async () => {
  try {
    return delayedRequest(data, 500);
  } catch (error) {
    return null;
  }
});

const CreateOneThunk = createAsyncThunk("employee/createOneThunk", async (newEmployee) => {
  try {
    const response = await delayedRequest(data, 500);
    return newEmployee;
  } catch (error) {
    return null;
  }
});

const DeleteOneThunk = createAsyncThunk("employee/deleteOneThunk", async (id) => {
  try {
    const response = await delayedRequest(data, 500);
    return id;
  } catch (error) {
    return null; 
  }
});

export { ReadOneThunk, ReadAllThunk, CreateOneThunk, DeleteOneThunk };
