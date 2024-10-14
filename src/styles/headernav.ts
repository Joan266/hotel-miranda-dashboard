import styled from 'styled-components';
export const Header = styled.header`
  padding: 0 1em;
  height: 5em;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content:left;
  background-color: #FFFFFF;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.15rem;
  color: ${(props) => props.theme.colors.darkGreen};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-right:1em;
  background-color: ${(props) => props.theme.colors.darkGreen};
  svg {
    margin-right: 0.5rem;
    }
`;