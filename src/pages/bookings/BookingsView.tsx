import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk } from '../../slices/BookingSlice/bookingThunks'; 
import { AppDispatch, RootState } from '../../store';
import { Container, ProfileWrapper, ProfileHeader, ProfileInfo, ProfileImgContainer, BigImage, Status, InfoGroup, Label, Field, Divider } from '../../styles/view';
import bookingDefault from '../../assets/img/default_room.webp';

export const BookingView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { single, status } = useSelector((state: RootState) => state.booking); 

  useEffect(() => {
    if (id) {
      dispatch(readOneThunk(id)); 
    }
  }, [id, dispatch]);

  if (status.loading) {
    return "loading";
  }

  if (!single) {
    return <Container>
      <h1>Booking Not Found</h1>
    </Container>;
  }

  return (
    <Container>
      <ProfileWrapper>
        <ProfileHeader>
          <ProfileImgContainer><img src={single.photourl || bookingDefault} alt="Booking image" /></ProfileImgContainer>
          <ProfileInfo>
            <h3>{single.firstname} {single.lastname}</h3>
            <small>#{single._id}</small>
          </ProfileInfo>
        </ProfileHeader>

        <InfoGroup>
          <span>
            <Label>Order Date:</Label>
            <Field>{new Date(single.orderdate).toDateString()}</Field>
          </span>
        </InfoGroup>
        <InfoGroup>
          <span>
            <Label>Check-in Date:</Label>
            <Field>{new Date(single.checkin).toDateString()}</Field>
          </span>
          <span>
            <Label>Check-out Date:</Label>
            <Field>{new Date(single.checkout).toDateString()}</Field>
          </span>
        </InfoGroup>

        <Divider />

        <InfoGroup>
          <span>
            <Label>Status:</Label>
            <Field>{single.status.charAt(0).toUpperCase() + single.status.slice(1)}</Field>
          </span>
        </InfoGroup>

        <InfoGroup>
          <span>
            <Label>Description:</Label>
            <Field>{single.description || 'No description provided'}</Field>
          </span>
        </InfoGroup>
      </ProfileWrapper>

      <BigImage>
        <Status>{single.status.charAt(0).toUpperCase() + single.status.slice(1)}</Status>
        <img src={single.photourl || bookingDefault} alt="Booking image" />
      </BigImage>
    </Container>
  );
};
