import styled from 'styled-components';

const Table = styled.div`
  display: grid;
  width: 100%;
  margin-top: 1em;
  border-radius: 0.5em;
  background-color: ${props => props.theme.colors.white};
  grid-template-columns: repeat(${props => props.columnscount}, auto);
  gap:0;
`;

const TableHeaderRow = styled.div`
  display: contents; 
`;

const TableHeaderCell = styled.div`
  width: 100%;
  text-align: left;
  padding: 1em ;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${props => props.theme.colors.mediumBlack};
  border-bottom: 2px solid ${props => props.theme.colors.lightGray}; 
`;

const TableRow = styled.div`
  display: contents;
  cursor: pointer;
  > div {
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      height: 10px;
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      transition: opacity 0.2s ease-in-out; 
    }

    &::before {
      top: -10px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 100%);
    }

    &::after {
      bottom: -10px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 100%);
    }
  }
  &:hover > div {
    &::before,
    &::after {
      opacity: 1;
    }
  }
`;
const CellContainer = styled.div`
  display: flex;
  width:100%;
  height:100%
`;
const TableCell = styled.div`
  text-align: left;
  width: 100%;
  min-width: fit-content;
  padding: 1em;
  height: ${props => props.height};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray}; 
`;
const ProfileImgContainer = styled.div`
  height: 60px;
  min-width: 60px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 0.3em;
  margin-right:1em;
  overflow:hidden;
  img {
    width:100%;
    height:100%;  
    cover:fit-content;
  }
`
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationInput = styled.input`
  width: 3em;
  margin: 0 0.5em;
  text-align: center;
`;
const PaginationButton = styled.button`
  padding: 0.5em 1em;
  color: ${props => props.theme.colors.darkGreen}; 
  border: 1px solid ${props => props.theme.colors.darkGreen};
  background-color: transparent;
  border-radius: 0.3em;
  font-size: 0.75rem;
  font-weight: 500;
  cursor:pointer;
  &:hover {
  color: ${props => props.theme.colors.mediumBlack}; 
  border: 1px solid ${props => props.theme.colors.mediumBlack};
  }
`;

export { Table, TableCell, CellContainer, TableHeaderRow, TableHeaderCell, TableRow, ProfileImgContainer, PaginationContainer,PaginationButton,PaginationControls,PaginationInput };