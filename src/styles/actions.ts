import styled from 'styled-components';

const ActionsContainer = styled.div`
  position: relative;
`;

const EllipsisContainer = styled.div`
  cursor: pointer;
  .ellipsis-icon {
    color: grey;
    font-size: 1.2rem;
     margin-left:2em;
  }

  &:hover .ellipsis-icon {
    color: black;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  transform:translate(0,-100%);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export { ActionsContainer, EllipsisContainer, Menu, MenuItem };