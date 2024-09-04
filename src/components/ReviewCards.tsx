import { SmallText, Text } from "../styles/common";
import clientDefault from '../assets/img/client_default.webp';
import { ProfileImgContainer } from "../styles/table";
import styled from 'styled-components';
import React from "react";


export const ReviewCards: React.FC<ReviewCardsProps> = ({ data }) => {
  return (
    <CardsContainer>
      {data.map((review) => (
        <ReviewCard key={"card"+review.id}>
          <Text maxwidth={"350px"}>{review.comment}</Text>
          <BottomContainer>
            <ProfileImgContainer>
              <img 
                src={review.img ? review.img : clientDefault} 
                alt="review profile customer" 
              />
            </ProfileImgContainer>
            <div>
              <Text><strong>{review.customer_name}</strong></Text>
              <SmallText>{review.review_date.text}</SmallText>
            </div>
            <div>
              <button>+</button>
              <button>-</button>
            </div>
          </BottomContainer>
        </ReviewCard> 
      ))}
    </CardsContainer>
  );
};
