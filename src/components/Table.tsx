import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  Table, TableCell, TableHeaderRow, TableHeaderCell, TableRow,
  PaginationContainer, PaginationButton, PaginationControls, PaginationInput, DataModifiers, FilterStatusNav, NavStatusOptions, SearchInputContainer, SearchInput,
} from '../styles/table';
import { Text, SmallText, Button } from '../styles/common';
import { useTableModifiers } from '../hooks/useTableModifiers';
import { TableComponentProps } from '../interfaces/common';
import { useNavigate } from 'react-router-dom';

export const TableComponent = <T extends { _id: string }>({
  pageSize,
  data,
  columns,
  statuses,
  sortConfig,
  searchConfig: initialSearchConfig,
}: TableComponentProps<T>) => {
  const [activeStatus, setActiveStatus] = useState<string | boolean>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchConfig?.query || ''); 
  const [inputPage, setInputPage] = useState<number | null>(null);

  const navigate = useNavigate();

  const searchConfig = {
    ...initialSearchConfig,
    query: searchQuery, 
  };

  const {
    page,
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    dataLength,
  } = useTableModifiers<T>(data, pageSize, activeStatus, sortConfig, searchConfig);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInputPage(value);
  };

  const handleActiveStatusChange = (statusValue: string | boolean) => {
    setActiveStatus(statusValue);
    goToPage(1);
  };

  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputPage === null || inputPage > totalPages || inputPage === 0) return;
      goToPage(inputPage);
      setInputPage(null);
    }
  };

  const handleAddOneClick = () => {
    navigate(`create`);
  };

  const handleRowClick = (rowId: string) => {
    navigate(`${rowId}`);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    goToPage(1); 
  };

  return (
    <>
      <DataModifiers>
        {statuses && (
          <FilterStatusNav>
            {statuses.map((status, index) => (
              <NavStatusOptions
                key={index}
                $active={(activeStatus === status.value).toString()}
                onClick={() => handleActiveStatusChange(status.value)}
              >
                {status.label}
              </NavStatusOptions>
            ))}
          </FilterStatusNav>
        )}
        <div>
          <Button onClick={handleAddOneClick}>Add One</Button>
        </div>

        <SearchInputContainer>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </SearchInputContainer>
      </DataModifiers>

      <Table $columnscount={columns.length}>
        <TableHeaderRow>
          {columns.map((column, cellIndex) => (
            <TableHeaderCell key={cellIndex}>{column.label}</TableHeaderCell>
          ))}
        </TableHeaderRow>
        {dataCurrentPage.map((row, rowIndex) => (
          <TableRow key={rowIndex} onClick={() => handleRowClick(row._id)}>
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
          <PaginationButton
            onClick={() => {
              goToPrevPage();
              setInputPage(null);
            }}
            disabled={page === 1}
          >
            {"<"}
          </PaginationButton>
          <PaginationInput
            type="number"
            value={inputPage !== null ? inputPage : ''}
            onChange={handleInputChange}
            onKeyDown={handleInputSubmit}
            placeholder={page.toString()}
            min={1}
            max={totalPages}
          />
          <Text>/ {totalPages}</Text>
          <PaginationButton
            onClick={() => {
              goToNextPage();
              setInputPage(null);
            }}
            disabled={page === totalPages}
          >
            {">"}
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
    </>
  );
};
