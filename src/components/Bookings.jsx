import bookingsData from '../data/bookings.json';
import { Table, TableCell, TableHeader, TableRow } from '../styles/table';
import { Container } from '../styles/common';

export const Bookings = () => {
  const limitedData = bookingsData.slice(0, 10);
  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Guest</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Check In</TableHeader>
            <TableHeader>Check Out</TableHeader>
            <TableHeader>Room Type</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {limitedData.map((booking, index) => (
            <TableRow key={index}>
              <TableCell>{`${booking.first_name} ${booking.last_name}`}</TableCell>
              <TableCell>{booking.order_date}</TableCell>
              <TableCell>{booking.check_in}</TableCell>
              <TableCell>{booking.check_out}</TableCell>
              <TableCell>{booking.room_type}</TableCell>
              <TableCell>{booking.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
