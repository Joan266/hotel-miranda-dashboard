const StatusButton = styled.div<StatusButtonProps>`
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