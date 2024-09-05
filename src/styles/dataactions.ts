import styled from 'styled-components';

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em; 
  
  div {
    cursor: pointer;
    transition: color 0.2s ease;
    color: #333333; 
    &:hover {
      color: #ff4545; 
    }
  }
`;
