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
export { Table, TableCell, TableHeader, TableRow };