import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText } from '../styles/common';
import { CellContainer, ProfileImgContainer } from '../styles/table';
import { readAllThunk } from '../slices/UserSlice/userThunks';
import clientDefault from '../assets/img/client_default.webp';
import { TableComponent } from './Table';
import { User, CreateUser } from '../interfaces/user';
import { Column, Status } from '../interfaces/common';
import { IsTextActive } from '../styles/users';
import { AppDispatch, RootState } from '../store';
import UserActions from './DataActions';

const statuses: Status[] = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];

export const Users = () => {
  const { items, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

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
          <IsTextActive status={user.status.toString()}>{user.status ? "ACTIVE" : "INACTIVE"}</IsTextActive>
        </Text>
      )
    },
    {
      label: "",
      display: () => (
        <UserActions />
      )
    },
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(readAllThunk());
    }
  }, [status, dispatch]);

  return (
    <Container>
      {items.length > 0 && (
        <TableComponent
          pageSize={8}
          data={items}
          columns={Columns}
          statuses={statuses}
        />
      )}
    </Container>
  );
};
