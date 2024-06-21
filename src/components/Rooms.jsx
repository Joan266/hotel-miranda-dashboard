import roomsData from '../data/rooms.json';
import { Table, TableCell, TableHeader, TableRow, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text } from '../styles/common';
import { useState } from 'react';
import usePagination from '../hooks/usePagination';
export const Rooms = () => {
  const pageSize = 8; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = usePagination(roomsData, pageSize);
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
            <TableHeader>Room Name</TableHeader>
            <TableHeader>Bed Type</TableHeader>
            <TableHeader>Room Floor</TableHeader>
            <TableHeader>Facilities</TableHeader>
            <TableHeader>Rate</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentData().map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.room_type}</TableCell>
              <TableCell>{room.bed_type}</TableCell>
              <TableCell>{`Floor ${room.floor_room}`}</TableCell>
              <TableCell>{room.facilities.map((item, index) => index !== 0 ? `, ${item}` : item)}</TableCell>
              <TableCell>{room.rate}</TableCell>
              <TableCell>{room.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
      <Text>
        Showing {pageSize} of {roomsData.length} entries
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
