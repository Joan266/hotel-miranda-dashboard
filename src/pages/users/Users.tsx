import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText } from '../../styles/common';
import { CellContainer, ProfileImgContainer } from '../../styles/table';
import { readAllThunk } from '../../slices/UserSlice/userThunks';
import clientDefault from '../../assets/img/client_default.webp';
import { TableComponent } from '../../components/Table';
import { UserInterface } from '../../interfaces/user';
import { Column, Status } from '../../interfaces/common';
import { IsTextActive } from '../../styles/users';
import { AppDispatch, RootState } from '../../store';
import UserActions from '../../components/Actions';
import styled from 'styled-components';
const statuses: Status[] = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];
const Arrow = styled.span`
  cursor: pointer;
  margin-left: 5px;
`;
type SortConfig = {
  type: 'date' | 'number' | 'string'; 
  property: string; 
  direction: -1 | 1;
};
const ArrowContainer = styled.span`
  display: flex;
  flex-direction: column; /* Align arrows vertically */
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;

const Triangle = styled.div<{ isActive: boolean; isDirection: boolean }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  cursor: pointer;
  margin: 1px 0; 

  border-bottom: ${(props) =>
    props.isDirection && props.isActive ? '10px solid darkgreen' : '10px solid gray'};
  transform: ${(props) => (props.isDirection ? 'rotate(0deg)' : 'rotate(180deg)')}; 
`;
export const Users = () => {
  const { items, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    property: 'joindate', 
    direction: 1, 
    type: "date",        
  });

  const handleSortChange = (property: string, type:'date' | 'number' | 'string') => {
    let newDirection = 1;

    if (sortConfig.property === property) {
      newDirection = sortConfig.direction === 1 ? -1 : 1;
    }

    setSortConfig({
      property,
      direction: newDirection,
      type
    });
  };
  const Columns: Column<UserInterface>[] = [
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          Name
          <ArrowContainer>
            <Triangle
              isActive={sortConfig.property === "lastname"}
              isDirection={true} 
              onClick={() => handleSortChange("lastname", "string")}
            />
            <Triangle
              isActive={sortConfig.property === "lastname"}
              isDirection={false} 
              onClick={() => handleSortChange("lastname", "string")}
            />
          </ArrowContainer>
        </span>
      ),
      display: (user) => (
        <CellContainer>
          <ProfileImgContainer>
            <img
              src={user.photoUrl ? user.photoUrl : clientDefault}
              alt="employee"
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{user.firstname} {user.lastname}</strong></Text>
            <SmallText>#{user._id}</SmallText>
          </div>
        </CellContainer>
      ),
    },
    {
      label: (
        <span>
          Join Date
          <Arrow onClick={() => handleSortChange("joindate","date")}>
            {sortConfig.property === "joindate" ? (sortConfig.direction === 1 ? '↑' : '↓') : ''}
          </Arrow>
        </span>
      ),
      display: (user) => (
        <Text>{new Date(user.joindate).toDateString()}</Text>
      ),
    },
    {
      label: "Job Desk",
      display: (user) => (
        <Text maxwidth={"350px"}>{user.jobdesk}</Text>
      )
    },
    {
      label: "Phone",
      display: (user) => (
        <Text>{user.phonenumber}</Text>
      )
    },
    {
      label: "Email",
      display: (user) => (
        <Text>{user.email}</Text>
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
    console.log(items, status, error);
  }, [status, dispatch]);

  return (
    <Container>
      {items.length > 0 && (
        <TableComponent
          pageSize={8}
          data={items}
          columns={Columns}
          statuses={statuses}
          sortConfig={sortConfig}
        />
      )}
    </Container>
  );
};
