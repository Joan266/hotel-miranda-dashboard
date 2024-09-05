import { StatusButtonProps } from '../interfaces/bookings';
import styled from 'styled-components';

const statusColors = {
  refund: '#E23428',
  booked: '#5AD07A',
  cancelled: '#BEBEBE',
  pending: '#6D6D6D',
  default: '#6D6D6D'
};
const getStatusColor = (status: string) => statusColors[status] || statusColors.default;
const getStatusBackgroundColor = (status: string) => statusBackgroundColors[status] || statusBackgroundColors.default;

const statusBackgroundColors = {
  refund: '#FFEDEC',
  booked: '#E8FFEE',
  cancelled: '#575757',
  pending: '#E2E2E2',
  default: '#E2E2E2'
};

export const StatusButton = styled.div<StatusButtonProps>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5em;
  height: 3em;
  color: ${(props) => getStatusColor(props.$status)};
  background-color: ${(props) => getStatusBackgroundColor(props.$status)};
  border-radius: 0.6em;
  font-size: 0.7rem;
`;