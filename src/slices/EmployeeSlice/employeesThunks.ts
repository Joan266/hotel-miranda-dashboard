import { createAsyncThunk } from "@reduxjs/toolkit";
import employeesData from '../../data/employees.json';
import { delayedRequest } from "../../utils/delayRequest";

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

const data: Employee[] = employeesData as Employee[];

const ReadOneThunk = createAsyncThunk<Employee | null, string>(
  "employee/readOneThunk",
  async (id) => {
    try {
      const response = await delayedRequest(
        data.find(employee => employee.id === id) || null,
        500
      );
      return response;
    } catch (error) {
      return null;
    }
  }
);

const ReadAllThunk = createAsyncThunk<Employee[], void>(
  "employee/readAllThunk",
  async () => {
    try {
      return delayedRequest(data, 500);
    } catch (error) {
      return [];
    }
  }
);

const CreateOneThunk = createAsyncThunk<Employee | null, Employee>(
  "employee/createOneThunk",
  async (newEmployee) => {
    try {
      const response = await delayedRequest(data, 500);
      return newEmployee;
    } catch (error) {
      return null;
    }
  }
);

const DeleteOneThunk = createAsyncThunk<string | null, string>(
  "employee/deleteOneThunk",
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
