import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText } from '../../styles/common';
import { CellContainer, ProfileImgContainer } from '../../styles/table';
import { readAllThunk } from '../../slices/UserSlice/userThunks';
import clientDefault from '../../assets/img/client_default.webp';
import { TableComponent } from '../../components/Table';
import { UserInterface, CreateUser } from '../../interfaces/user';
import { Column, Status } from '../../interfaces/common';
import { IsTextActive } from '../../styles/users';
import { AppDispatch, RootState } from '../../store';
import UserActions from '../../components/DataActions';

const statuses: Status[] = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];

export const Users = () => {
  const { items, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const Columns: Column<UserInterface>[] = [
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
      display: (user) => (
        <UserActions userId={user._id}/>
      )
    },
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(readAllThunk());
    }
    console.log(items,status, error)
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
