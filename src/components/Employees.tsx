import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText } from '../styles/common';
import { CellContainer, ProfileImgContainer } from '../styles/table';
import { ReadAllThunk, DeleteOneThunk } from '../slices/EmployeeSlice/employeesThunks';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import styled from 'styled-components';
import clientDefault from '../assets/img/client_default.webp';
import {TableComponent} from './Table';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  img: string | null;
  join_date: { text: string };
  job_desk: string;
  schedule: { days: string; hours: string };
  phone_number: string;
  status: boolean;
}

interface EmployeeState {
  items: Employee[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}

interface Status {
  label: string;
  value: boolean | string;
}

const IsTextActive = styled.div<{ status: boolean }>`
  color: ${props => props.status ? "#5AD07A" : "#E23428"};
`;

const statuses: Status[] = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];

export const Employees = () => {
  const { items, status, error } = useSelector(
    (state: { employee: EmployeeState }) => state.employee
  );
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState<Employee[] | null>(null);

  const Columns: Column<Employee>[] = [
    {
      label: "Name",
      display: (employee) => (
        <>
          <CellContainer>
            <ProfileImgContainer>
              <img 
                src={employee.img || clientDefault}
                alt="employee"
              />
            </ProfileImgContainer> 
            <div>
              <Text><strong>{employee.first_name} {employee.last_name}</strong></Text>
              <SmallText>#{employee.id}</SmallText>
              <Text>Joined on {employee.join_date.text}</Text>
            </div>
          </CellContainer>
        </>
      ),
      sort: "name"
    },
    {
      label: "Job Desk",
      display: (employee) => (
        <Text maxwidth={"350px"}>{employee.job_desk}</Text>
      )
    },
    {
      label: "Schedule",
      display: (employee) => (
        <>
          <Text>{employee.schedule.days}</Text>
          <SmallText>{employee.schedule.hours}</SmallText>
        </>
      )
    },
    {
      label: "Contact",
      display: (employee) => (
        <Text>{employee.phone_number}</Text>
      )
    },
    {
      label: "Status",
      display: (employee) => (
        <Text>
          <IsTextActive status={employee.status}>{employee.status ? "ACTIVE" : "INACTIVE"}</IsTextActive>
        </Text>
      )
    },
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      setEmployeeData(items);
    } else if (status === 'rejected' && error) {
      toast.error('API request limit reached, try searching for photos again in 1 hour', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [status, items, error, dispatch]);

  return (
    <Container>
      {employeeData && (
        <TableComponent
          pageSize={8}
          data={employeeData}
          columns={Columns}
          statuses={statuses}
        />
      )}
    </Container>
  );
};
