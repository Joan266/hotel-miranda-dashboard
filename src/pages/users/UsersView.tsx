import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readOneThunk } from '../../slices/UserSlice/userThunks';
import { AppDispatch, RootState } from '../../store';
import { Container, ProfileWrapper, ProfileHeader, ProfileInfo, ProfileImgContainer, BigImage, Status, InfoGroup, Label, Field, Description, Divider } from '../../styles/view';
import clientDefault from '../../assets/img/client_default.webp';

export const UsersView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { single, status } = useSelector((state: RootState) => state.user);

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
      <h1>User Not Found</h1>
    </Container>;
  }

  return (
    <Container>
      <ProfileWrapper>
        <ProfileHeader>
          <ProfileImgContainer><img src={single.photourl || clientDefault} alt="imagen de perfil"/></ProfileImgContainer>
          <ProfileInfo>
            <h3>{single.firstname} {single.lastname}</h3>
            <small>#{single._id}</small>
            <p><small>({single.jobdesk})</small></p>
          </ProfileInfo>
        </ProfileHeader>

        <InfoGroup>
          <span>
            <Label>Email:</Label>
            <Field>{single.email}</Field>
          </span>
          <span>
            <Label>Phone:</Label>
            <Field>{single.phonenumber}</Field>
          </span>
        </InfoGroup>

        <Divider />

        <InfoGroup>
          <span>
            <Label>Employee ID:</Label>
            <Field>{single._id}</Field>
          </span>
          <span>
            <Label>Start Date:</Label>
            <Field>{new Date(single.joindate).toLocaleDateString()}</Field>
          </span>
        </InfoGroup>

        <InfoGroup>
          <span>
            <Label>Description:</Label>
            <Description>{single.description}</Description>
          </span>
        </InfoGroup>
      </ProfileWrapper>
      <BigImage>
        <Status>Activo</Status>
        <img src={single.photourl || clientDefault} alt=""></img>
      </BigImage>
    </Container>
  );
};
