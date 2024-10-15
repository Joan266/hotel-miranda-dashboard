import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { AppDispatch, RootState } from '../store';
import { readOneThunk } from '../slices/UserSlice/userThunks';
import { useNavigate } from 'react-router-dom';
import React from "react";
import { AuthContainer, UserProfileContainer, ProfileEmail, ProfileImage, ProfileName,LogoutButton, FooterContainer, DashboardTitle, CopyrightText, MadeWithLove } from "../styles/authstatus";
import clientDefault from '../assets/img/client_default.webp';


export const AuthStatus: React.FC = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { single, status } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.user && user.user._id) {
      dispatch(readOneThunk(user.user._id));
    }
  }, [user, dispatch]);

  if (status && status === "loading") {
    return null;
  }

  if (!single) {
    return "ey";
  }

  const handleUserContainerClick = () => {
    user && navigate(`/users/${user.user._id}`);
  };

  return (
    <AuthContainer>
      <UserProfileContainer onClick={handleUserContainerClick}>
        <ProfileImage src={single.photourl ?? clientDefault} alt="Profile Image" />
        <ProfileName>{single.firstname}</ProfileName>
        <ProfileEmail>{single.email}</ProfileEmail>
        <LogoutButton
          onClick={(e) => {
            e.stopPropagation();
            logout();
          }}
        >
          Logout
        </LogoutButton>
      </UserProfileContainer>

      <FooterContainer>
        <DashboardTitle>Trvl Hotel Admin Dashboard</DashboardTitle>
        <CopyrightText>© 2024 All Rights Reserved</CopyrightText>
        <MadeWithLove>Made with ♥ by J. Alemany</MadeWithLove>
      </FooterContainer>
    </AuthContainer>
  );
}

