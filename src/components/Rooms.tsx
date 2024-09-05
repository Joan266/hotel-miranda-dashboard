import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CellContainer } from '../styles/table';
import { Container, SmallText, Text } from '../styles/common';
import { ReadAllThunk, DeleteOneThunk } from '../slices/RoomSlice/roomThunks';
import standardRoomImg from '../assets/img/standard_room.webp';
import deluxeRoomImg from '../assets/img/deluxe_room.webp';
import { TableComponent } from './Table';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { Room, RoomState } from '../interfaces/rooms';
import { Column, Status } from '../interfaces/common';
import { RoomImgContainer, StatusButton } from '../styles/rooms';
const statuses: Status[] = [
  { label: 'All Rooms', value: 'all' },
  { label: 'Available Rooms', value: 'available' },
  { label: 'Booked Rooms', value: 'booked' },
];

export const Rooms = () => {
  const { items, status, error } = useSelector(
    (state: { room: RoomState }) => state.room
  );
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState<Room[] | null>(null);

  const Columns: Column<Room>[] = [
    {
      label: "RoomName",
      display: (room) => (
        <CellContainer>
          <RoomImgContainer>
            <img
              src={room.room_type.startsWith("Standard") ? standardRoomImg : deluxeRoomImg}
              alt={room.room_type}
            />
          </RoomImgContainer>
          <div>
            <SmallText>#{room.id}</SmallText>
            <Text>{room.room_type}</Text>
          </div>
        </CellContainer>
      ),
      sort: "name",
    },
    {
      label: "Bed Type",
      display: (room) => (
        <Text>{room.bed_type}</Text>
      ),
    },
    {
      label: "Room Floor",
      display: (room) => (
        <>
          <Text>Floor {room.floor_room}</Text>
        </>
      ),
    },
    {
      label: "Facilities",
      display: (room) => (
        <Text>{room.facilities.map((item, index) => (index !== 0 ? `, ${item}` : item))}</Text>
      ),
    },
    {
      label: "Rate",
      display: (room) => (
        <CellContainer>
          <Text><strong>${room.rate}</strong></Text>
          <SmallText>/night</SmallText>
        </CellContainer>
      ),
    },
    {
      label: "Status",
      display: (room) => (
        <StatusButton status={room.status}>{room.status}</StatusButton>
      ),
    },
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      setRoomData(items);
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
      {roomData && (
        <TableComponent
          pageSize={7}
          data={roomData}
          columns={Columns}
          statuses={statuses}
        />
      )}
    </Container>
  );
};
