import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableCell, TableHeaderRow,TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
import { Container, Text, SmallText } from '../styles/common';
import { useDataModifiers } from '../hooks/useDataModifiers';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { ReadAllThunk } from '../slices/BookingSlice/bookingThunks';
import { TableComponent } from './Table';
import clientDefault from '../assets/img/client_default.webp';

const getStatusColor = (status) => {
  switch (status) {
    case 'refund':
      return '#E23428';
    case 'booked':
      return '#5AD07A';
    case 'cancelled':
      return '#BEBEBE';
    case 'pending':
      return '#6D6D6D';
    default:
      return '#6D6D6D'; 
  }
};

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case 'refund':
      return '#FFEDEC';
    case 'booked':
      return '#E8FFEE';
    case 'cancelled':
      return '#575757';
    case 'pending':
      return '#E2E2E2';
    default:
      return '#E2E2E2'; 
  }
};

const StatusButton = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5em;
  height: 3em;
  color: ${(props) => getStatusColor(props.$status)};
  background-color: ${(props) => getStatusBackgroundColor(props.$status)};
  border-radius: 0.6em;
  font-size: 0.7rem;
`;

const Columns = [
  {label: "Guest", display: booking => (
      <>
        <CellContainer>
          <ProfileImgContainer>
            <img 
                  src={ booking.img
                    ? "" 
                    : clientDefault} 
                  alt="employee" 
            />
          </ProfileImgContainer>
          <div>
            <Text><strong>{booking.first_name} {booking.last_name}</strong></Text>
            <SmallText>#{booking.id}</SmallText>
          </div>
        </CellContainer>
      </>
  ), sort: "name"},
  {label: "Order Date", display: booking => (
    <>
      <Text>{booking.order_date.date}</Text>
      <SmallText>{booking.order_date.time}</SmallText>
    </>
  )},
  {label: "Check in", display: booking => (
    <>
      <Text>{booking.check_in.date}</Text>
      <SmallText>{booking.check_in.time}</SmallText>
    </>
  )},
  {label: "Check out", display: booking => (
    <>
      <Text>{booking.check_out.date}</Text>
      <SmallText>{booking.check_out.time}</SmallText>
    </>
  )},
  {label: "Room type", display: booking => (
    <Text>{booking.room_type}</Text>
  )},
  {label: "Status", display: booking => (
    <StatusButton  $status={booking.status}>{booking.status}</StatusButton>
  )},
];
const statuses = [
  { label: 'All Bookings', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Booked', value: 'booked' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refund', value: 'refund' }
];
const sorterProperty = 'order_date.datetime';
export const Bookings = () => {
  const { items, status, error } = useSelector(state => state.booking);
  const dispatch = useDispatch();
  const [bookingsData, setBookingsData] = useState(null);

  useEffect(() => {
    console.log(status)
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      console.log(items);
      setBookingsData(items);
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
      {bookingsData && <TableComponent pageSize={6} data={bookingsData} columns={Columns} statuses={statuses} sorterProperty={sorterProperty}></TableComponent>}
    </Container>
  );
};
