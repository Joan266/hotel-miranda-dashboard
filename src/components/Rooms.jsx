import roomsData from '../data/rooms.json';
import { Table, TableCell, CellContainer,TableHeaderRow,TableHeaderCell, TableRow,  PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, SmallText, Text } from '../styles/common';
import { useState } from 'react';
import { useDataModifiers } from '../hooks/useDataModifiers';
import styled from 'styled-components';
import standardRoomImg from '../assets/img/standard_room.webp';
import deluxeRoomImg from '../assets/img/deluxe_room.webp';

const RoomImgContainer = styled.div`
  height: 85px;
  min-width: 170px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 0.5em;
  margin-right:1em;
  overflow: hidden;
  img {
    object-fit: cover;
    width:100%;
    height:100%;  
  }
`
const StatusButton = styled.div`
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  width: 6.5em;
  height:3em;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.status === "available" ? "#5AD07A" : "#E23428"};
  border-radius:0.6em;
  font-size: 0.7rem;
`
export const Rooms = () => {
  const pageSize = 7; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = useDataModifiers(roomsData, pageSize);
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
      <Table columnscount={6}>
        <TableHeaderRow>
          <TableHeaderCell>Room Name</TableHeaderCell>
          <TableHeaderCell>Bed Type</TableHeaderCell>
          <TableHeaderCell>Room Floor</TableHeaderCell>
          <TableHeaderCell>Facilities</TableHeaderCell>
          <TableHeaderCell>Rate</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
        {currentData().map((room, index) => (
          <TableRow key={index}>
            <TableCell>
              <CellContainer>
                <RoomImgContainer>
                  <img 
                    src={room.room_type.startsWith("Standard") 
                      ? standardRoomImg 
                      : deluxeRoomImg} 
                    alt={room.room_type} 
                  />
                </RoomImgContainer>
                <div>
                  <SmallText>#{room.id}</SmallText>
                  <Text>{room.room_type}</Text>
                </div>
              </CellContainer>
            </TableCell>
            <TableCell><Text>{room.bed_type}</Text></TableCell>
            <TableCell><Text>Floor {room.floor_room}</Text></TableCell>
            <TableCell><Text>{room.facilities.map((item, index) => index !== 0 ? `, ${item}` : item)}</Text></TableCell>
            <TableCell>
              <CellContainer>
                <Text><strong>${room.rate}</strong></Text>
                <SmallText>/night</SmallText>
              </CellContainer>
            </TableCell>
            <TableCell><StatusButton status={room.status}>{room.status}</StatusButton></TableCell>
          </TableRow>
        ))}
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
