
import clientDefault from '../assets/img/client_default.webp';
import { Table, TableCell, TableHeaderRow,TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
import { Container, Text, SmallText } from '../styles/common';
import styled from 'styled-components';
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
export const TableComponent = ({data, columnsCount}) => {

return (  
  <Table $columnscount={columnsCount} >
    <TableHeaderRow>
      <TableHeaderCell>Guest</TableHeaderCell>
      <TableHeaderCell>Order Date</TableHeaderCell>
      <TableHeaderCell>Check In</TableHeaderCell>
      <TableHeaderCell>Check Out</TableHeaderCell>
      <TableHeaderCell>Room Type</TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
    </TableHeaderRow>
    {data.map((booking, index) => (
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
  )
};