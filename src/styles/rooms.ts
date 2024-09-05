import styled from 'styled-components';
export const RoomImgContainer = styled.div`
  height: 65px;
  min-width: 130px;
  background-color: ${(props) => props.theme.colors.lightGray};
  border-radius: 0.3em;
  margin-right: 1em;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const StatusButton = styled.div<{ status: string }>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5em;
  height: 3em;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.status === "available" ? "#5AD07A" : "#E23428"};
  border-radius: 0.6em;
  font-size: 0.7rem;
`;