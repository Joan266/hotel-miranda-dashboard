import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CellContainer, ProfileImgContainer } from '../styles/table';
import { Container, Text, SmallText } from '../styles/common';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { ReadAllThunk, DeleteOneThunk } from '../slices/BookingSlice/bookingThunks';
import { TableComponent } from './Table';
import clientDefault from '../assets/img/client_default.webp';

const statusColors = {
  refund: '#E23428',
  booked: '#5AD07A',
  cancelled: '#BEBEBE',
  pending: '#6D6D6D',
  default: '#6D6D6D'
};

const statusBackgroundColors = {
  refund: '#FFEDEC',
  booked: '#E8FFEE',
  cancelled: '#575757',
  pending: '#E2E2E2',
  default: '#E2E2E2'
};

const getStatusColor = (status: string) => statusColors[status] || statusColors.default;
const getStatusBackgroundColor = (status: string) => statusBackgroundColors[status] || statusBackgroundColors.default;



const statuses = [
  { label: 'All Bookings', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Booked', value: 'booked' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refund', value: 'refund' }
];

const sorterProperty = 'order_date.datetime';

export const Bookings = () => {
  const { items, status, error } = useSelector((state: { booking: BookingState }) => state.booking);
  const dispatch = useDispatch();
  const [bookingsData, setBookingsData] = useState<Booking[] | null>(null);

  const Columns = [
    {
      label: "Guest",
      display: (booking: Booking) => (
        <CellContainer>
          <ProfileImgContainer>
            <img
              src={booking.img ? booking.img : clientDefault}
              alt="employee"
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{booking.first_name} {booking.last_name}</strong></Text>
            <SmallText>#{booking.id}</SmallText>
          </div>
        </CellContainer>
      ),
      sort: "name"
    },
    {
      label: "Order Date",
      display: (booking: Booking) => (
        <>
          <Text>{booking.order_date.date}</Text>
          <SmallText>{booking.order_date.time}</SmallText>
        </>
      )
    },
    {
      label: "Check in",
      display: (booking: Booking) => (
        <>
          <Text>{booking.check_in.date}</Text>
          <SmallText>{booking.check_in.time}</SmallText>
        </>
      )
    },
    {
      label: "Check out",
      display: (booking: Booking) => (
        <>
          <Text>{booking.check_out.date}</Text>
          <SmallText>{booking.check_out.time}</SmallText>
        </>
      )
    },
    {
      label: "Room type",
      display: (booking: Booking) => (
        <Text>{booking.room_type}</Text>
      )
    },
    {
      label: "Status",
      display: (booking: Booking) => (
        <StatusButton $status={booking.status}>{booking.status}</StatusButton>
      )
    },
    {
      label: "Actions",
      display: (booking: Booking) => (
        <>
          <button onClick={() => console.log(`edit ${booking.id}`)}>edit</button>
          <button onClick={() => dispatch(DeleteOneThunk(booking.id))}>delete</button>
        </>
      )
    }
  ];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      setBookingsData(items);
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
      {bookingsData && <TableComponent pageSize={8} data={bookingsData} columns={Columns} statuses={statuses} sorterProperty={sorterProperty}></TableComponent>}
    </Container>
  );
};
