import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text, SmallText, IsTextActive, LabelContainer, ArrowContainer, Triangle } from '../../styles/common';
import { CellContainer } from '../../styles/table';
import { readAllThunk as readAllReviewsThunk } from '../../slices/ReviewSlice/reviewThunks';
import { TableComponent } from '../../components/Table';
import { ReviewInterface } from '../../interfaces/review';
import { Column, Status } from '../../interfaces/common';
import { AppDispatch, RootState } from '../../store';
import ReviewActions from './ReviewActions';
import { SortConfig, SearchConfig } from '../../interfaces/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { LoaderComponent } from '../../components/Loader';

const searchConfig: SearchConfig = {
  query: "",
  param: "lastname",
};

const statuses: Status[] = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Published', value: true },
  { label: 'Archived', value: false },
];

export const Reviews = () => {
  const { items, status, error } = useSelector((state: RootState) => state.review);
  const dispatch = useDispatch<AppDispatch>();
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSortChange = (property: string, type: 'date' | 'number' | 'string', direction: 1 | -1) => {
    let newDirection = direction;

    if (sortConfig?.property === property && sortConfig?.direction === direction) {
      newDirection = sortConfig.direction === 1 ? -1 : 1;
    }

    setSortConfig({
      property,
      direction: newDirection,
      type
    });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(readAllReviewsThunk());
    }
    console.log(items, status, error);
  }, [status, dispatch]);

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, idx) => (
          <FontAwesomeIcon key={idx} icon={faStarSolid} color='#FFD43B' />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfStroke} color='#FFD43B' />}
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <FontAwesomeIcon key={idx} icon={faStarRegular} color='#FFD43B' />
        ))}
      </>
    );
  };
  const Columns: Column<ReviewInterface>[] = [
    {
      label: (
        <LabelContainer>
          Name
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "lastname" && sortConfig?.direction === 1}
              $isDirection={true}
              onClick={() => handleSortChange("lastname", "string", 1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "lastname" && sortConfig?.direction === -1}
              $isDirection={false}
              onClick={() => handleSortChange("lastname", "string", -1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (review) => (
        <CellContainer>
          <div>
            <Text><strong>{review.firstname} {review.lastname}</strong></Text>
            <SmallText>#{review._id}</SmallText>
          </div>
        </CellContainer>
      ),
    },
    {
      label: (
        <LabelContainer>
          Review Date
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "reviewdate" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("reviewdate", "date", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "reviewdate" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("reviewdate", "date", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (review) => (
        <Text>{new Date(review.reviewdate).toDateString()}</Text>
      ),
    },
    {
      label: "Comment",
      display: (review) => (
        <Text $maxwidth={"350px"}>{review.comment || "No comment"}</Text>
      )
    },
    {
      label: (
        <LabelContainer>
          Rate
          <ArrowContainer>
            <Triangle
              $isActive={sortConfig?.property === "rate" && sortConfig?.direction === -1}
              $isDirection={true}
              onClick={() => handleSortChange("rate", "number", -1)}
            />
            <Triangle
              $isActive={sortConfig?.property === "rate" && sortConfig?.direction === 1}
              $isDirection={false}
              onClick={() => handleSortChange("rate", "number", 1)}
            />
          </ArrowContainer>
        </LabelContainer>
      ),
      display: (review) => (
        <Text>
          {renderStars(review.rate)}
        </Text>
      )
    },
    {
      label: "Status",
      display: (review) => (
        <Text>
          <IsTextActive $status={review.status.toString()}>{review.status ? "Published" : "Archived"}</IsTextActive>
        </Text>
      )
    },
    {
      label: "",
      display: (review) => (
        <ReviewActions reviewId={review._id} />
      )
    },
  ];

  return (
    <Container>
      {status === 'loading' ? (
        <LoaderComponent />
      ) : (items.length > 0 && (
        <TableComponent
          pageSize={8}
          data={items}
          columns={Columns}
          statuses={statuses}
          sortConfig={sortConfig}
          searchConfig={searchConfig}
        />
      ))}
    </Container>
  );
};
