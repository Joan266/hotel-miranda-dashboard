import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Table, TableCell, TableHeaderRow,TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text, SmallText } from '../styles/common';
import usePagination from '../hooks/usePagination';
import styled from 'styled-components';
import clientDefault from '../assets/img/client_default.webp';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { ReadAllThunk } from '../slices/BookingSlice/bookingThunks';
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
const getStatusBackgroundcolor = (status) => {
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
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  width: 6.5em;
  height:3em;
  color: ${props => getStatusColor(props.$status)};
  background-color: ${props => getStatusBackgroundcolor(props.$status)};
  border-radius:0.6em;
  font-size: 0.7rem;
`

const DataModifiers = styled.div`
  margin: 20px;
`;

const FilterStatusNav = styled.div`
  margin-bottom: 20px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
`;

const NavStatusOptions = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.$active === "true" ? '#007BFF' : '#E0E0E0')};
  color: ${(props) => (props.$active === "true" ? '#FFF' : '#000')};
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => (props.$active === "true" ? '#0056b3' : '#d6d6d6')};
  }
`;
export const Bookings = () => {
  const { items, status, error } = useSelector(state => state.booking);
  const dispatch = useDispatch();
  const params = useParams();
  const pageSize = 8; 
  const [bookingsData, setBookingsData] = useState(null);
  const {
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
  } = usePagination(bookingsData, pageSize, params.page || 1); 
  const [inputPage, setInputPage] =useState(params.page || 1);
  const [activeStatus, setActiveStatus] = useState('all');
  const [filteredData, setFilteredData] = useState(null);

  useEffect(()=>{setInputPage(params.page || 1)},[params.page])
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setInputPage(value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      if(inputPage>totalPages || inputPage === 0)return;
      goToPage(inputPage);
    }
  };

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
  useEffect(() => {
    if (activeStatus === 'all') {
      setFilteredData(dataCurrentPage);
    } else {
      setFilteredData(dataCurrentPage.filter(booking => booking.status === activeStatus));
    }
  }, [activeStatus, dataCurrentPage]);

  return (
    <Container>
      { filteredData  && <>
      <DataModifiers>
        <FilterStatusNav>
          <Nav>
            <NavStatusOptions $active={(activeStatus === 'all').toString()} onClick={() => setActiveStatus('all')}>
              All Bookings
            </NavStatusOptions>
            <NavStatusOptions $active={(activeStatus === 'pending').toString()} onClick={() => setActiveStatus('pending')}>
              Pending
            </NavStatusOptions>
            <NavStatusOptions $active={(activeStatus === 'booked').toString()} onClick={() => setActiveStatus('booked')}>
              Booked
            </NavStatusOptions>
            <NavStatusOptions $active={(activeStatus === 'cancelled').toString()} onClick={() => setActiveStatus('cancelled')}>
              Cancelled
            </NavStatusOptions>
            <NavStatusOptions $active={(activeStatus === 'refund').toString()} onClick={() => setActiveStatus('refund')}>
              Refund
            </NavStatusOptions>
          </Nav>
        </FilterStatusNav>
      </DataModifiers>
      <Table $columnscount={6} >
        <TableHeaderRow>
          <TableHeaderCell>Guest</TableHeaderCell>
          <TableHeaderCell>Order Date</TableHeaderCell>
          <TableHeaderCell>Check In</TableHeaderCell>
          <TableHeaderCell>Check Out</TableHeaderCell>
          <TableHeaderCell>Room Type</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
        {filteredData.map((booking, index) => (
          <TableRow key={index}>
            <TableCell height={"5em"}>
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
            </TableCell>
            <TableCell>
              <Text>{booking.order_date.date}</Text>
              <SmallText>{booking.order_date.time}</SmallText>
            </TableCell>
            <TableCell>
              <Text>{booking.check_in.date}</Text>
              <SmallText>{booking.check_in.time}</SmallText>
            </TableCell>
            <TableCell>
              <Text>{booking.check_out.date}</Text>
              <SmallText>{booking.check_out.time}</SmallText>
            </TableCell>
            <TableCell><Text>{booking.room_type}</Text></TableCell>
            <TableCell><StatusButton  $status={booking.status}>{booking.status}</StatusButton></TableCell>
          </TableRow>
        ))}
      </Table>
      <PaginationContainer>
        <Text>
          Showing {pageSize} of {bookingsData.length} entries
        </Text>
        <PaginationControls>
          <PaginationButton onClick={() => goToPrevPage()} disabled={params.page === 1 || !params.page}>Prev</PaginationButton>
          <PaginationInput 
              type="number" 
              value={inputPage || ""} 
              onChange={handleInputChange} 
              onKeyDown={handleInputSubmit} 
              min={1}
              max={totalPages}
            />
            <Text>{totalPages}</Text>
          <PaginationButton onClick={() => goToNextPage()} disabled={params.page === totalPages}>Next</PaginationButton>
        </PaginationControls>
      </PaginationContainer>
      </>}
    </Container>
  );
};
