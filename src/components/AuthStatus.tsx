import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { AppDispatch, RootState } from '../store';
import { readOneThunk } from '../slices/UserSlice/userThunks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from "react";
import clientDefault from '../assets/img/client_default.webp';
const AuthContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  margin-top: 5rem;
`;

const UserProfileContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.menuBox};
  box-shadow: 0px 20px 30px #00000014;
  padding: 2rem 1rem 1rem 1rem;
  border-radius: 1rem;
  margin: 0 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.06);
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 60px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  top: -31px;
  left: 50%;
  transform: translate(-50%,0);
`;

const ProfileName = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const ProfileEmail = styled.small`
  color: #888888;
  font-size: 12px;
  font-weight: normal;
`;

const FooterContainer = styled.div`
  text-align: left;
`;

const DashboardTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.2rem;
`;

const CopyrightText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.menuText};
  margin-bottom: 1rem;
`;

const MadeWithLove = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.menuText};
`;

export const AuthStatus: React.FC = () => {
    const { user } = useAuth();
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
            </UserProfileContainer>

            <FooterContainer>
                <DashboardTitle>Trvl Hotel Admin Dashboard</DashboardTitle>
                <CopyrightText>© 2024 All Rights Reserved</CopyrightText>
                <MadeWithLove>Made with ♥ by J. Alemany</MadeWithLove>
            </FooterContainer>
        </AuthContainer>
    );
}

