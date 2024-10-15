import { SmallText, Text } from "../styles/common";
import { ProfileImgContainer } from "../styles/table";
import { CardsContainer, ReviewCard, BottomContainer, InfoContainer, ProfileContainer } from "../styles/reviewcards";
import clientDefault from '../assets/img/client_default.webp';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { ReviewInterface } from "../interfaces/review";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from "react";
import React from "react";
import ReviewActions from '../pages/reviews/ReviewActions';
import { readAllThunk as readAllReviewsThunk } from '../slices/ReviewSlice/reviewThunks';
import { LoaderComponent } from './Loader';
export const ReviewCards = () => {
  const { items, status, error } = useSelector((state: RootState) => state.review);
  const dispatch = useDispatch<AppDispatch>();

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
  useEffect(() => {
    if (status === 'idle') {
      dispatch(readAllReviewsThunk());
    }
    console.log(items, status, error);
  }, [status, dispatch]);

  if (status === 'loading') return <LoaderComponent/>;

  return (
    
    <CardsContainer>
      {items?.map((item: ReviewInterface) => (
        <ReviewCard key={`card-${item._id}`}>
          <Text $maxwidth={"350px"}>{item.comment}</Text>
          <Text>
            {renderStars(item.rate)}
          </Text>
          <BottomContainer>
            <ProfileContainer>
              <ProfileImgContainer>
                <img
                  src={clientDefault}
                  alt={`${item.firstname || 'User'} profile image`}
                />
              </ProfileImgContainer>
              <InfoContainer>
                <Text><strong>{item.firstname}</strong></Text>
                <Text><strong>{item.lastname}</strong></Text>
                <SmallText>{new Date(item.reviewdate).toDateString()}</SmallText>
              </InfoContainer>
            </ProfileContainer>
            <ReviewActions reviewId={item._id} />
          </BottomContainer>
        </ReviewCard>
      ))}
    </CardsContainer>
  );
};
