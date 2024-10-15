import { LuCalendarCheck2 } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { ButtonsContainer, ButtonContent, ButtonImage, ButtonTextContainer } from "../styles/kpiscomponent";
import React from "react";

const KpisComponent: React.FC = () => {
  return (
    <>
      <ButtonsContainer>
        <ButtonContent to={'/dashboard/bookings'}>
          <ButtonImage>
            <MdOutlineBed />
          </ButtonImage>
          <ButtonTextContainer>
            <h3>8,461</h3>
            <p>New Booking</p>
          </ButtonTextContainer>
        </ButtonContent>

        <ButtonContent to={'/dashboard/rooms'}>
          <ButtonImage>
            <LuCalendarCheck2 />
          </ButtonImage>
          <ButtonTextContainer>
            <h3>963</h3>
            <p>Scheduled Room</p>
          </ButtonTextContainer>
        </ButtonContent>

        <ButtonContent to={'/dashboard/bookings'}>
          <ButtonImage>
            <RiLoginBoxLine />
          </ButtonImage>
          <ButtonTextContainer>
            <h3>753</h3>
            <p>Check In</p>
          </ButtonTextContainer>
        </ButtonContent>

        <ButtonContent to={'/dashboard/bookings'}>
          <ButtonImage>
            <RiLogoutBoxLine />
          </ButtonImage>
          <ButtonTextContainer>
            <h3>516</h3>
            <p>Check Out</p>
          </ButtonTextContainer>
        </ButtonContent>
      </ButtonsContainer>
    </>
  );
}



export default KpisComponent;