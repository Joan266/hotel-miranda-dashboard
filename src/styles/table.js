import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  margin-top: 1em;
  border-radius:0.5em;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.white}
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1em;
  font-size: 0.75rem;
  font-weight:600;
  color: ${props => props.theme.colors.mediumBlack};
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td`
  text-align: left;
  padding: 1em;
  max-width:12em;
  font-size: 0.75rem;
  height: 5em;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  font-weight:500;
  color: ${props => props.theme.colors.mediumBlack};
`;

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

export { Table, TableCell, TableHeader, TableRow,PaginationContainer,PaginationButton,PaginationControls,PaginationInput };