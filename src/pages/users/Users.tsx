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
import { SortConfig } from '../../interfaces/common';
import styled from 'styled-components';
const statuses: Status[] = [
  { label: 'All Employees', value: 'all' },
  { label: 'Active Employee', value: true },
  { label: 'Inactive Employee', value: false },
];
const LabelContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
`;
const ArrowContainer = styled.span`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;

const Triangle = styled.div<{ $isActive: boolean; $isDirection: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  cursor: pointer;
  margin: 1px 0; 
  border-bottom: ${(props) =>
    props.$isActive ? '8px solid darkgreen' : '8px solid gray'};
  transform: ${(props) => (props.$isDirection ? 'rotate(0deg)' : 'rotate(180deg)')}; 
`;
export const Users = () => {
  const { items, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSortChange = (property: string, type:'date' | 'number' | 'string', direction: 1 | -1) => {
    let newDirection = direction;

    if (sortConfig?.property === property && sortConfig?.direction === direction) {
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
        <LabelContainer>
          Name
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "lastname" && sortConfig?.direction === 1}
              $isDirection={true} 
              onClick={() => handleSortChange("lastname", "string", 1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "lastname" && sortConfig?.direction === -1}
              $isDirection={false} 
              onClick={() => handleSortChange("lastname", "string", -1)}
            />
          </ArrowContainer>
        </LabelContainer>
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
        <LabelContainer>
          Join Date
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "joindate" && sortConfig?.direction === 1}
              $isDirection={true} 
              onClick={() => handleSortChange("joindate", "date", 1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "joindate" && sortConfig?.direction === -1}
              $isDirection={false} 
              onClick={() => handleSortChange("joindate", "date", -1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (user) => (
        <Text>{new Date(user.joindate).toDateString()}</Text>
      ),
    },
    {
      label: "Job Desk",
      display: (user) => (
        <Text $maxwidth={"350px"}>{user.jobdesk}</Text>
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
          <IsTextActive $status={user.status.toString()}>{user.status ? "ACTIVE" : "INACTIVE"}</IsTextActive>
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
          pageSize={6}
          data={items}
          columns={Columns}
          statuses={statuses}
          sortConfig={sortConfig}
        />
      )}
    </Container>
  );
};
