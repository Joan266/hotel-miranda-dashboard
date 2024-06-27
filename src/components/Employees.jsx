import employeesData from '../data/employees.json';
import { Table, TableCell, CellContainer,TableHeaderRow,TableHeaderCell, TableRow, ProfileImgContainer, PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
  import { Container, Text, SmallText } from '../styles/common';
import { useState } from 'react';
import { useDataModifiers } from '../hooks/useDataModifiers';
import styled from 'styled-components';
import clientDefault from '../assets/img/client_default.webp';

const IsTextActive = styled.div`
  color: ${props => props.status ? "#5AD07A" : "#E23428"};
`
export const Employees = () => {
  const pageSize = 8; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = useDataModifiers(employeesData, pageSize);
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
      <Table columnscount={5}>
        <TableHeaderRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Job Desk</TableHeaderCell>
          <TableHeaderCell>Schedule</TableHeaderCell>
          <TableHeaderCell>Contact</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeaderRow>
        {currentData().map((employee, index) => (
          <TableRow key={index}>
            <TableCell height={"5.5em"}>
              <CellContainer>
                <ProfileImgContainer>
                  <img 
                      src={ employee.img
                        ? "" 
                        : clientDefault} 
                      alt="employee" 
                  />
                </ProfileImgContainer> 
                <div>
                  <Text><strong>{employee.first_name} {employee.last_name}</strong></Text>
                  <SmallText>#{employee.id}</SmallText>
                  <Text>Joined on {employee.join_date.text}</Text>
                </div>
              </CellContainer>
            </TableCell>
            <TableCell><Text maxwidth={"350px"}>{employee.job_desk}</Text></TableCell>
            <TableCell><Text>{employee.schedule.days}</Text> <SmallText>{employee.schedule.hours}</SmallText></TableCell>
            <TableCell><Text>{employee.phone_number}</Text></TableCell>
            <TableCell><Text><IsTextActive status={employee.status}>{employee.status ? "ACTIVE" : "INACTIVE"}</IsTextActive></Text></TableCell>
          </TableRow>
        ))}
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
