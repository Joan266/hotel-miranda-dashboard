import { 
  Table, TableCell, TableHeaderRow, TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, 
  PaginationContainer, PaginationButton, PaginationControls, PaginationInput 
} from '../styles/table';
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

export const TableComponent = ({ data, columns }) => {
  return (  
    <Table $columnscount={columns.length}>
      <TableHeaderRow>
        {columns.map((column, cellIndex) => (
          <TableHeaderCell key={cellIndex}>{column.label}</TableHeaderCell> 
        ))}
      </TableHeaderRow>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>{column.display(row)}</TableCell> 
          ))}
        </TableRow>
      ))}
    </Table>
  );
};
