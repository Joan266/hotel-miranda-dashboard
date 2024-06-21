import reviewsData from '../data/reviews.json';
import { Table, TableCell, TableHeader, TableRow } from '../styles/table';
import { Container } from '../styles/common';

export const Reviews = () => {
  const limitedData = reviewsData.slice(0, 8);
  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Order Id</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Comment</TableHeader>
            <TableHeader>Rating</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {limitedData.map((review, index) => (
            <TableRow key={index}>
              <TableCell>#{review.order_id}</TableCell>
              <TableCell>{review.review_date.text}</TableCell>
              <TableCell>{review.customer_name}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.rating}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
