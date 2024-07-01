import { Container, Text, SmallText } from '../styles/common';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  CellContainer, ProfileImgContainer} from '../styles/table';
import { ReadAllThunk, DeleteOneThunk } from '../slices/EmployeeSlice/employeesThunks';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import styled from 'styled-components';
import clientDefault from '../assets/img/client_default.webp';
import { TableComponent } from './Table';
const IsTextActive = styled.div`
  color: ${props => props.status ? "#5AD07A" : "#E23428"};
`
const statuses = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];

export const Employees = () => {
  const { items, status, error } = useSelector(state => state.employee);
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState(null);
  const Columns = [
    {label: "Name", display: employee => (
        <>
          <CellContainer>
            <ProfileImgContainer>
              <img 
                  src={ employee.img
                    ? "" 
                    : clientDefault} 
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
    ), sort: "name"},
    {label: "Job Desk", display: employee => (
      <Text maxwidth={"350px"}>{employee.job_desk}</Text>
    )},
    {label: "Schedule", display: employee => (
      <>
        <Text>{employee.schedule.days}</Text>
        <SmallText>{employee.schedule.hours}</SmallText>
      </>
    )},
    {label: "Contact", display: employee => (
      <Text>{employee.phone_number}</Text>
    )},
    {label: "Status", display: employee => (
      <Text>
        <IsTextActive status={employee.status}>{employee.status ? "ACTIVE" : "INACTIVE"}</IsTextActive>
      </Text>
    )},
  ];
  
  useEffect(() => {
    console.log(status)
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      console.log(items);
      setEmployeeData(items);
    } else if (status === 'rejected') {
      console.log(error);
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
  }, [status]);
 
  return (
    <Container>
      {employeeData && <TableComponent pageSize={6} data={employeeData} columns={Columns} statuses={statuses}></TableComponent>}
    </Container>
  );
};
