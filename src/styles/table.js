import styled from 'styled-components';

const Table = styled.div`
  display: grid;
  width: 100%;
  margin-top: 1em;
  border-radius: 0.5em;
  background-color: ${props => props.theme.colors.white};
  grid-template-columns: repeat(${props => props.$columnscount}, auto);
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
  width: 1.5em;
  margin-right: 0.4em;
  font-size: 0.75rem;
  font-weight:600;
  color: ${props => props.theme.colors.mediumBlack};
  text-align: center;
  background-color:transparent;
  border:none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
      /* Hide the spinners in input type number */
  /* For Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
const PaginationButton = styled.button`
  padding: 0.2em 0.5em;
  color: ${props => props.theme.colors.darkGreen}; 
  border: 1px solid ${props => props.theme.colors.darkGreen};
  background-color: transparent;
  border-radius: 0.3em;
  font-size: 0.75rem;
  font-weight: 500;
  cursor:pointer;
  margin: 0 0.5em;
  &:hover {
  color: ${props => props.theme.colors.black}; 
  border: 1px solid ${props => props.theme.colors.black};
  }
  &:disabled {
    color: ${props => props.theme.colors.gray}; 
    border: 1px solid ${props => props.theme.colors.gray};
    cursor: not-allowed;
  }
`;

export { Table, TableCell, CellContainer, TableHeaderRow, TableHeaderCell, TableRow, ProfileImgContainer, PaginationContainer,PaginationButton,PaginationControls,PaginationInput };