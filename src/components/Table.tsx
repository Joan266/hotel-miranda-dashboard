import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  Table, TableCell, TableHeaderRow, TableHeaderCell, TableRow,
  PaginationContainer, PaginationButton, PaginationControls, PaginationInput, DataModifiers, FilterStatusNav, NavStatusOptions,
} from '../styles/table';
import { Text, SmallText, Button } from '../styles/common';
import { useTableModifiers } from '../hooks/useTableModifiers';
import { TableComponentProps } from '../interfaces/common';


export const TableComponent = <T,>({ pageSize, data, columns, statuses, sortConfig }: TableComponentProps<T>) => {
  const [activeStatus, setActiveStatus] = useState<string | boolean>('all');
  const {
    page,
    dataCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    totalPages,
    dataLength,
  } = useTableModifiers<T>(data, pageSize, activeStatus, sortConfig);

  const [inputPage, setInputPage] = useState<number | null>(null);

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
    navigate(`/${}/create`);
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
          <Button onClick={() => handleAddOneClick()}>Add One</Button>
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
          <PaginationButton onClick={() => { goToPrevPage(); setInputPage(null); }} disabled={page === 1}>
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
          <PaginationButton onClick={() => { goToNextPage(); setInputPage(null); }} disabled={page === totalPages}>
            {">"}
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
    </>
  );
};
