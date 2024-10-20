import styled from 'styled-components';

export const AuthContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  margin-top: 5rem;
`;

export const UserProfileContainer = styled.div`
  position: relative;
  background-color: #FFFFFF;
  padding: 2rem 1rem 1rem 1rem;
  border-radius: 1rem;
  margin: 0 0.5rem;
  margin-bottom: 3rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 20px 30px #00000014;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.06);
  }
`;

export const ProfileImage = styled.img`
  position: absolute;
  width: 60px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  top: -31px;
  left: 50%;
  transform: translate(-50%,0);
`;

export const ProfileName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

export const ProfileEmail = styled.small`
  color: #888888;
  font-size: 14px;
  font-weight: normal;
`;

export const FooterContainer = styled.div`
  text-align: left;
`;
export const LogoutButton = styled.div`
  cursor: pointer;
  padding: 0.5em 0.5em;
  font-size: 0.7rem;
  background-color: ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.4em;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryRed};
  }
`;
export const DashboardTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #3b3b3b;
  margin-bottom: 0.2rem;
`;

export const CopyrightText = styled.p`
  font-size: 12px;
  color: #799283;
  margin-bottom: 1rem;
`;

export const MadeWithLove = styled.p`
  font-size: 13px;
  color: #799283;
`;