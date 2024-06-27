import { useEffect, useState } from 'react';
import { 
  Table, TableCell, TableHeaderRow, TableHeaderCell, TableRow, CellContainer, ProfileImgContainer, 
  PaginationContainer, PaginationButton, PaginationControls, PaginationInput 
} from '../styles/table';
import { Container, Text, SmallText } from '../styles/common';
import styled from 'styled-components';
import { useDataModifiers } from '../hooks/useDataModifiers';
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

export const TableComponent = ({ pageSize, data, columns }) => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [dateSorter, setDateSorter] = useState('newest');
  const {
    page,
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
  } = useDataModifiers(data, pageSize, activeStatus, dateSorter); 

  const [inputPage, setInputPage] = useState("");

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setInputPage(value);
  };
  const handleDateSorterChange = (event) => {
    setDateSorter(event.target.value);
  };


  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log(inputPage)
      if(inputPage>totalPages || inputPage === 0 || !inputPage)return;
      setInputPage(null)
      goToPage(inputPage);
    }
  };

  return (  
    <>
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
    <Table $columnscount={columns.length}>
      <TableHeaderRow>
        {columns.map((column, cellIndex) => (
          <TableHeaderCell key={cellIndex}>{column.label}</TableHeaderCell> 
        ))}
      </TableHeaderRow>
      {dataCurrentPage.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, cellIndex) => (
            <TableCell key={cellIndex}>{column.display(row)}</TableCell> 
          ))}
        </TableRow>
      ))}
    </Table>
    <PaginationContainer>
    <Text>
      Showing {pageSize} of {dataCurrentPage.length} entries
    </Text>
    <PaginationControls>
      <PaginationButton onClick={() => { goToPrevPage(); setInputPage(null); }} disabled={page === 1 }>Prev</PaginationButton>
      <PaginationInput 
          type="number" 
          value={inputPage||""} 
          onChange={handleInputChange} 
          onKeyDown={handleInputSubmit} 
          placeholder={page}
          min={1}
          max={totalPages}
        ></PaginationInput>
        <Text>{totalPages}</Text>
      <PaginationButton onClick={() => {goToNextPage(); setInputPage(null);}} disabled={page === totalPages}>Next</PaginationButton>
    </PaginationControls>
    </PaginationContainer>
    </>
  );
};
