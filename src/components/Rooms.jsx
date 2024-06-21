import roomsData from '../data/rooms.json';
import { Table, TableCell, TableHeader, TableRow } from '../styles/table';
import { Container } from '../styles/common';

export const Rooms = () => {
  const limitedData = roomsData.slice(0, 8);
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
          {limitedData.map((room, index) => (
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
    </Container>
  );
};
