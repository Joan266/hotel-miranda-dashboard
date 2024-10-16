import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import React from "react";
import { 
  AuthContainer, 
  UserProfileContainer, 
  ProfileEmail, 
  ProfileImage, 
  ProfileName, 
  LogoutButton, 
  FooterContainer, 
  DashboardTitle, 
  CopyrightText, 
  MadeWithLove 
} from "../styles/authstatus";
import clientDefault from '../assets/img/client_default.webp';

export const AuthStatus: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.user) return null;

  const { _id, photourl, firstname, email } = user.user;

  const handleUserContainerClick = () => {
    navigate(`/users/${_id}`);
  };

  return (
    <AuthContainer>
      <UserProfileContainer onClick={handleUserContainerClick}>
        <ProfileImage src={photourl ?? clientDefault} alt="Profile Image" />
        <ProfileName>{firstname}</ProfileName>
        <ProfileEmail>{email}</ProfileEmail>
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
};
