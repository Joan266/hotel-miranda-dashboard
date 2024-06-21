import employeesData from '../data/employees.json';
import { Table, TableCell, TableHeader, TableRow, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text } from '../styles/common';
import { useState } from 'react';
import usePagination from '../hooks/usePagination';

export const Employees = () => {
  const pageSize = 8; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = usePagination(employeesData, pageSize);
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
            <TableHeader>Name</TableHeader>
            <TableHeader>Job Desk</TableHeader>
            <TableHeader>Schedule</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentData().map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
              <TableCell>{employee.job_desk}</TableCell>
              <TableCell>{`${employee.schedule.days} ${employee.schedule.hours}`}</TableCell>
              <TableCell>{employee.phone_number}</TableCell>
              <TableCell>{employee.status ? "ACTIVE" : "INACTIVE"}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
      <Text>
        Showing {pageSize} of {employeesData.length} entries
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
