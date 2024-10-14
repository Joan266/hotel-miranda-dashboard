import styled from 'styled-components';

const DataActionsContainer = styled.div`
  position: relative;
`;

const EllipsisContainer = styled.div`
  cursor: pointer;
  .ellipsis-icon {
    color: grey;
    font-size: 1.2rem;
  }

  &:hover .ellipsis-icon {
    color: black;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
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

export { DataActionsContainer, EllipsisContainer, Menu, MenuItem };