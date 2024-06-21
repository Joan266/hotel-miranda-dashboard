import bookingsData from '../data/bookings.json';
import { Table, TableCell, TableHeader, TableRow, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text } from '../styles/common';
import { useState } from 'react';
import usePagination from '../hooks/usePagination';

export const Bookings = () => {
  const pageSize = 10; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = usePagination(bookingsData, pageSize);
  const [inputPage, setInputPage] =useState(currentPage);
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
          {currentData().map((booking, index) => (
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
      <PaginationContainer>
      <Text>
        Showing {pageSize} of {bookingsData.length} entries
      </Text>
      <PaginationControls>
        <PaginationButton onClick={() => goToPrevPage()} disabled={currentPage === 1}>Prev</PaginationButton>
        <PaginationInput 
            type="number" 
            value={inputPage} 
            onChange={handleInputChange} 
            onKeyDown={handleInputSubmit} 
            min={1}
            max={totalPages}
          />
          <Text>{totalPages}</Text>
        <PaginationButton onClick={() => goToNextPage()} disabled={currentPage === totalPages}>Next</PaginationButton>
      </PaginationControls>
    </PaginationContainer>
    </Container>
  );
};
