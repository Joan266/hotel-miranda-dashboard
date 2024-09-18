import { SmallText, Text } from "../styles/common";
import { ProfileImgContainer } from "../styles/table";
import { CardsContainer, ReviewCard, BottomContainer } from "../styles/reviewcards";
import clientDefault from '../assets/img/client_default.webp';
import { ReviewCardsProps } from "../interfaces/reviewscards";
import React from "react";

export const ReviewCards: React.FC<ReviewCardsProps> = ({ data = [] }) => {
  return (
    <CardsContainer>
      {data.map(({ id, comment, img, customer_name, review_date }) => (
        <ReviewCard key={`card-${id}`}>
          <Text maxwidth={"350px"}>{comment}</Text>
          <BottomContainer>
            <ProfileImgContainer>
              <img
                src={img ? img : clientDefault}
                alt={`${customer_name} profile image`}
              />
            </ProfileImgContainer>
            <div>
              <Text><strong>{customer_name}</strong></Text>
              <SmallText>{review_date?.text}</SmallText>
            </div>
            <div>
              <button aria-label="Upvote Review">+</button>
              <button aria-label="Downvote Review">-</button>
            </div>
          </BottomContainer>
        </ReviewCard>
      ))}
    </CardsContainer>
  );
};
