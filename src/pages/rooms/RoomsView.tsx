import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk } from '../../slices/RoomSlice/roomThunks';
import { AppDispatch, RootState } from '../../store';
import { Container, ProfileWrapper, ProfileHeader, ProfileInfo, ProfileImgContainer, BigImage, Status, InfoGroup, Label, Field, Divider } from '../../styles/view';
import roomDefault from '../../assets/img/default_room.webp';
import RoomActions from './RoomActions';
import { LoaderComponent } from '../../components/Loader';

export const RoomsView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { single, status } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (id) {
      dispatch(readOneThunk(id));
    }
  }, [id, dispatch]);



  const discountedPrice = single && single.rate * (1 - single.offer / 100);

  return (
    <>
      {status === 'loading' || !single ? (
        <LoaderComponent />
      ) : (
        <Container>
          <ProfileWrapper>
            <ProfileHeader>
              <ProfileImgContainer ><img src={single.photourl || roomDefault} alt="Room image" /></ProfileImgContainer>
              <ProfileInfo>
                <h3>{single.name}</h3>
                <small>#{single._id}</small>
              </ProfileInfo>

              <RoomActions roomId={id} />
            </ProfileHeader>

            <InfoGroup>
              <span>
                <Label>Bed Type:</Label>
                <Field>{single.bedtype}</Field>
              </span>
            </InfoGroup>

            <InfoGroup>
              <span>
                <Label>Rate:</Label>
                <Field>${single.rate.toFixed(2)}</Field>
              </span>
              <span>
                <Label>Offer:</Label>
                <Field>{single.offer}%</Field>
              </span>
              <span>
                <Label>Final Price:</Label>
                <Field>${discountedPrice?.toFixed(2)}</Field>
              </span>
            </InfoGroup>

            <Divider />

            <InfoGroup>
              <span>
                <Label>Facilities:</Label>
                <Field>{single.facilities?.join(', ') || 'No facilities listed'}</Field>
              </span>
            </InfoGroup>
          </ProfileWrapper>

          <BigImage>
            <Status>{single.status === 'available' ? 'Available' : single.status.charAt(0).toUpperCase() + single.status.slice(1)}</Status>
            <img src={single.photourl || roomDefault} alt="Room image" />
          </BigImage>
        </Container>)}
    </>
  );
};
