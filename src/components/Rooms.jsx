import { CellContainer } from '../styles/table';
import { Container, SmallText, Text } from '../styles/common';
import { useState } from 'react';
import { TableComponent } from './Table';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReadAllThunk, DeleteOneThunk } from '../slices/RoomSlice/roomThunks';
import styled from 'styled-components';
import standardRoomImg from '../assets/img/standard_room.webp';
import deluxeRoomImg from '../assets/img/deluxe_room.webp';

const RoomImgContainer = styled.div`
  height: 65px;
  min-width: 130px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 0.5em;
  margin-right:1em;
  overflow: hidden;
  img {
    object-fit: cover;
    width:100%;
    height:100%;  
  }
`
const StatusButton = styled.div`
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  width: 6.5em;
  height:3em;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.status === "available" ? "#5AD07A" : "#E23428"};
  border-radius:0.6em;
  font-size: 0.7rem;
`
const statuses = [
  { label: 'All Rooms', value: 'all' },
  { label: 'Available Rooms', value: 'available' },
  { label: 'Booked Rooms', value: 'booked' },
];

export const Rooms = () => {
  const { items, status, error } = useSelector(state => state.room);
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState(null);
  const Columns = [
    {label: "RoomName", display: room => (
        <>
          <CellContainer>
            <RoomImgContainer>
              <img 
                src={room.room_type.startsWith("Standard") 
                  ? standardRoomImg 
                  : deluxeRoomImg} 
                alt={room.room_type} 
              />
            </RoomImgContainer>
            <div>
              <SmallText>#{room.id}</SmallText>
              <Text>{room.room_type}</Text>
            </div>
          </CellContainer>
        </>
    ), sort: "name"},
    {label: "Bed Type", display: room => (
      <Text>{room.bed_type}</Text>
    )},
    {label: "Room Floor", display: room => (
      <>
        <Text>Floor {room.floor_room}</Text>
      </>
    )},
    {label: "Facilities", display: room => (
      <Text>{room.facilities.map((item, index) => index !== 0 ? `, ${item}` : item)}</Text>
    )},
    {label: "Rate", display: room => (
      <CellContainer>
        <Text><strong>${room.rate}</strong></Text>
        <SmallText>/night</SmallText>
      </CellContainer>
    )},
    {label: "Status", display: room => (
      <StatusButton status={room.status}>{room.status}</StatusButton>
    )},
  ];
  
  useEffect(() => {
    console.log(status)
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      console.log(items);
      setRoomData(items);
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
      {roomData && <TableComponent pageSize={6} data={roomData} columns={Columns} statuses={statuses}></TableComponent>}
    </Container>
  );
};
