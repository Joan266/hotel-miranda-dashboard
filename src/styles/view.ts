import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top:3em;
  padding: 1em 1.5em;
  border:2px solid darkgreen;
  background-color: white;
  border-radius: 8px;
  gap:4em;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex:1;
  flex-direction: column;
  border-radius: 8px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileInfo = styled.div`
  margin-left: 15px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }

  small {
    color: #777;
  }

  p {
    margin: 5px 0 0;
    small {
      font-size: 14px;
      color: #999;
    }
  }
`;

export const ProfileImgContainer = styled.div`
  height: 80px;
  min-width: 80px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 0.3em;
  margin-right: 1em;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    cover: fit-content;
  }
`;
export const BigImage = styled.div`
  position:relative;
  flex:1;
  border:1px solid green;
  border-radius: 10px;
  overflow:hidden;
  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 0;

  span {
    display: flex;
    flex-direction: column;
  }
`;

export const Label = styled.small`
  color: #555;
  margin-bottom:0.25em;
`;

export const Field = styled.h5`
  margin: 0;
  color: #333;
  font-size: 17px;
`;

export const Description = styled.h5`
  font-size: 17px;
  color: #333;
  line-height: 1.6;
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #999;
  margin: 20px 0;
`;

export const Status = styled.span`
  position:absolute;
  top:10px;
  right:10px;
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 14px;
  align-self: flex-end;
  z-index:2;
`;
