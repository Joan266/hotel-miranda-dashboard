import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText } from '../styles/common';
import { CellContainer, ProfileImgContainer } from '../styles/table';
import { ReadAllThunk } from '../slices/UserSlice/userThunks';
import styled from 'styled-components';
import clientDefault from '../assets/img/client_default.webp';
import { TableComponent } from './Table';
import { User } from '../interfaces/user';
import { AppDispatch, RootState } from '../store';

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

export const Users = () => {
  const { items, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<User[]>([]);

  const Columns: Column<User>[] = [
    {
      label: "Name",
      display: (user) => (
        <CellContainer>
          <ProfileImgContainer>
            <img
              src={clientDefault}
              alt="employee"
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{user.firstname} {user.lastname}</strong></Text>
            <SmallText>#{user._id}</SmallText>
            <Text>Joined on {new Date(user.joindate).toDateString()}</Text>
          </div>
        </CellContainer>
      ),
      sort: "name"
    },
    {
      label: "Job Desk",
      display: (user) => (
        <Text maxwidth={"350px"}>{user.jobdesk}</Text>
      )
    },
    {
      label: "Schedule",
      display: (user) => (
        <>
          <Text>{user.days}</Text>
          <SmallText>{user.hours}</SmallText>
        </>
      )
    },
    {
      label: "Contact",
      display: (user) => (
        <Text>{user.phonenumber}</Text>
      )
    },
    {
      label: "Status",
      display: (user) => (
        <Text>
          <IsTextActive status={user.status}>{user.status ? "ACTIVE" : "INACTIVE"}</IsTextActive>
        </Text>
      )
    },
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'fulfilled') {
      setUserData(items);
    } 
  }, [status]);

  return (
    <Container>
      {userData.length > 0 && (
        <TableComponent
          pageSize={8}
          data={userData}
          columns={Columns}
          statuses={statuses}
        />
      )}
    </Container>
  );
};
