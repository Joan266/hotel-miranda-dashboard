import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableCell, TableHeaderRow,TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text, SmallText } from '../styles/common';
import { useDataModifiers } from '../hooks/useDataModifiers';
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

const DateSorterSelector = styled.select`
  padding: 0.5em 1em;
  border: 1px solid ${props => props.theme.colors.darkGreen};
  background-color: transparent;
  color: ${props => props.theme.colors.darkGreen};
  cursor: pointer;
  font-size: 0.7rem;
  border-radius: 0.4em;
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  background-color: transparent;
  color: ${props => props.theme.colors.darkGreen};
  cursor: pointer;
  padding: 1em;
`;

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
  margin-bottom:1.5em;
  display:flex;
  align-items:center;
  justify-content:space-between;
  `;

const FilterStatusNav = styled.nav`
  display: flex;
`;

const NavStatusOptions = styled.button`
  padding: 0.7em 2em;
  border: none;
  font-size: 0.7rem;
  font-weight:500;
  font-family: ${props => props.theme.fontFamily};
  border-bottom: 2px solid  ${(props) => (props.$active === "true" ? props.theme.colors.darkGreen : "#B0B0B0")};
  background-color: transparent;
  color: ${(props) => (props.$active === "true" ? props.theme.colors.darkGreen : props.theme.colors.gray)};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.darkGreen };
    border-bottom: 2px solid ${props => props.theme.colors.darkGreen};
  }
`;
export const Bookings = () => {
  const { items, status, error } = useSelector(state => state.booking);
  const dispatch = useDispatch();
  const pageSize = 6; 
  const [bookingsData, setBookingsData] = useState(null);
  const [activeStatus, setActiveStatus] = useState('all');
  const [dateSorter, setDateSorter] = useState('newest');

  const {
    page,
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
  } = useDataModifiers(bookingsData, pageSize, activeStatus, dateSorter); 
  const [inputPage, setInputPage] = useState(null);

  const handleDateSorterChange = (event) => {
    setDateSorter(event.target.value);
  };
  useEffect(()=>{setInputPage(page)},[page])

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
 

  return (
    <Container>
      { dataCurrentPage  && <>
      <DataModifiers>
        <FilterStatusNav>
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
        </FilterStatusNav>
        <DateSorterSelector value={dateSorter} onChange={handleDateSorterChange}>
          <Option value="newest">Newest</Option>
          <Option value="oldest">Oldest</Option>
        </DateSorterSelector>
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
        {dataCurrentPage.map((booking, index) => (
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
          <PaginationButton onClick={() => goToPrevPage()} disabled={page === 1 }>Prev</PaginationButton>
          <PaginationInput 
              type="number" 
              value={inputPage || ""} 
              onChange={handleInputChange} 
              onKeyDown={handleInputSubmit} 
              min={1}
              max={totalPages}
            />
            <Text>{totalPages}</Text>
          <PaginationButton onClick={() => goToNextPage()} disabled={page === totalPages}>Next</PaginationButton>
        </PaginationControls>
      </PaginationContainer>
      </>}
    </Container>
  );
};
