import { useState } from 'react';
import reviewsData from '../data/reviews.json';
import { Table, TableCell, TableHeaderRow,TableHeaderCell, TableRow,  PaginationContainer,
  PaginationButton, PaginationControls, PaginationInput } from '../styles/table';
import { Container, Text } from '../styles/common';
import usePagination from '../hooks/usePagination';

export const Reviews = () => {
  const pageSize = 8; 
  const { currentPage, currentData, goToPage, goToNextPage, goToPrevPage, totalPages } = usePagination(reviewsData, pageSize);
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
    <Table columnscount={4}>
      <TableHeaderRow>
        <TableHeaderCell>Order Id</TableHeaderCell>
        <TableHeaderCell>Date</TableHeaderCell>
        <TableHeaderCell>Customer</TableHeaderCell>
        <TableHeaderCell>Comment</TableHeaderCell>
      </TableHeaderRow>
      {currentData().map((review, index) => (
        <TableRow key={index}>
          <TableCell><Text>#{review.order_id}</Text></TableCell>
          <TableCell><Text>{review.review_date.text}</Text></TableCell>
          <TableCell><Text>{review.customer_name}</Text></TableCell>
          <TableCell><Text maxwidth={"350px"}>{review.comment}</Text></TableCell>
        </TableRow>
      ))}
    </Table>
    <PaginationContainer>
      <Text>
        Showing {pageSize} of {reviewsData.length} entries
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
