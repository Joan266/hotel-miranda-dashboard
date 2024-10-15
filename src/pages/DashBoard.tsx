import React from "react";
import  KpisComponent from "../components/KpisComponent";
import Calendar from "../components/Calendar";
import { ReviewCards } from "../components/ReviewCards";
import styled from 'styled-components';

export const DashBoardContainer = styled.div`
  padding: 1em;
  padding-bottom:0;
  margin:0;
  width: calc(100% - 300px);
`;
export const DashBoard: React.FC = () => {
  return (
  <DashBoardContainer>
    <KpisComponent/>
    <Calendar/>
    <ReviewCards/>
  </DashBoardContainer>
  );
};