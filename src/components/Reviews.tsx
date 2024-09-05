import React, { useState, useEffect } from 'react';
import { Container, Text } from '../styles/common';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { ReadAllThunk, DeleteOneThunk } from '../slices/ReviewSlice/reviewThunks';
import { ReviewCards } from './ReviewCards';
import { TableComponent } from './Table';
import { Review, ReviewState, Column } from '../interfaces/reviews';
const sorterProperty = 'review_date.date';

export const Reviews = () => {
  const { items, status, error } = useSelector(
    (state: { review: ReviewState }) => state.review
  );
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState<Review[] | null>(null);

  const Columns: Column<Review>[] = [
    {
      label: "Order Id", display: review => (
        <Text>#{review.order_id}</Text>
      )
    },
    {
      label: "Date", display: review => (
        <Text>{review.review_date.text}</Text>
      )
    },
    {
      label: "Customer", display: review => (
        <Text>{review.customer_name}</Text>
      )
    },
    {
      label: "Comment", display: review => (
        <Text maxwidth={"350px"}>{review.comment}</Text>
      )
    },
  ];

  useEffect(() => {
    console.log(status);
    if (status === 'idle') {
      dispatch(ReadAllThunk());
    } else if (status === 'fulfilled') {
      console.log(items);
      setReviewData(items);
    } else if (status === 'rejected') {
      console.log(error);
      toast.error('API request limit reached, try searching for photos again in 1 hour', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [status, items, error, dispatch]);

  return (
    <Container>
      {reviewData &&
        <>
          <ReviewCards data={reviewData} />
          <TableComponent
            pageSize={8}
            data={reviewData}
            columns={Columns}
            sorterProperty={sorterProperty}
          />
        </>
      }
    </Container>
  );
};
