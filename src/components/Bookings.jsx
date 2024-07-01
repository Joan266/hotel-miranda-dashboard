import { useState, useEffect } from 'react';
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

const getStatusColor = (status) => statusColors[status] || statusColors.default;
const getStatusBackgroundColor = (status) => statusBackgroundColors[status] || statusBackgroundColors.default;

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
  const Columns = [
    {label: "Guest", display: booking => (
        <>
          <CellContainer>
            <ProfileImgContainer>
              <img 
                    src={ booking.img
                      ? booking.img 
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
      <StatusButton $status={booking.status}>{booking.status}</StatusButton>
    )},
    {label: "Actions", display: booking => (
      <>
        <button onClick={() => console.log(`edit ${booking.id}`)}>edit</button>
        <button onClick={() => dispatch(DeleteOneThunk(booking.id))}>delete</button>
      </>
    )},
  ];
  
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
