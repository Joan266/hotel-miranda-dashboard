import styled from 'styled-components';

export const IsTextActive = styled.div<{ $status: string }>`
  color: ${props => props.$status === "true" ? "#5AD07A" : "#E23428"};
`;
