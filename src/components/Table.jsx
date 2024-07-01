import { useState } from 'react';
import { 
  Table, TableCell, TableHeaderRow, TableHeaderCell, TableRow,
  PaginationContainer, PaginationButton, PaginationControls, PaginationInput,
  DateSorterSelector, Option, DataModifiers, FilterStatusNav, NavStatusOptions,
} from '../styles/table';
import { Text, SmallText } from '../styles/common';
import { useDataModifiers } from '../hooks/useDataModifiers';

export const TableComponent = ({ pageSize, data, columns, statuses,sorterProperty }) => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [dateSorter, setDateSorter] = useState('newest');
  const {
    page,
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    dataLength,
  } = useDataModifiers(data, pageSize, activeStatus, dateSorter, sorterProperty); 

  const [inputPage, setInputPage] = useState("");

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setInputPage(value);
  };
  const handleDateSorterChange = (event) => {
    setDateSorter(event.target.value);
    goToPage(1);
  };
  const handleActiveStatusChange = (statusValue) => {
    setActiveStatus(statusValue);
    goToPage(1);
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
       { statuses && <FilterStatusNav>
          {statuses.map((status, index) => (
            <NavStatusOptions
              key={index}
              $active={(activeStatus === status.value).toString()}
              onClick={() => handleActiveStatusChange(status.value)}
            >
              {status.label}
            </NavStatusOptions>
          ))}
        </FilterStatusNav>}
        <div>
        <button>Add one +</button>

        {sorterProperty && <DateSorterSelector value={dateSorter} onChange={handleDateSorterChange}>
          <Option value="newest">Newest</Option>
          <Option value="oldest">Oldest</Option>
        </DateSorterSelector>}
        </div>
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
    <SmallText>
      Showing {pageSize} of {dataLength} entries
    </SmallText>
    <PaginationControls>
      <PaginationButton onClick={() => { goToPrevPage(); setInputPage(null); }} disabled={page === 1 }>{"<"}</PaginationButton>
      <PaginationInput 
          type="number" 
          value={inputPage||""} 
          onChange={handleInputChange} 
          onKeyDown={handleInputSubmit} 
          placeholder={page}
          min={1}
          max={totalPages}
        ></PaginationInput>
        <Text>/ {totalPages}</Text>
      <PaginationButton onClick={() => {goToNextPage(); setInputPage(null);}} disabled={page === totalPages}>{">"}</PaginationButton>
    </PaginationControls>
    </PaginationContainer>
    </>
  );
};
